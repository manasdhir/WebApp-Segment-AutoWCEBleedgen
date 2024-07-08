from keras.layers import Input, Conv2D, BatchNormalization, Activation, MaxPooling2D, UpSampling2D, Concatenate, Add
from keras.models import Model
from keras.layers import Input, Conv2D, BatchNormalization, Activation, MaxPooling2D, UpSampling2D, Concatenate, Add
from keras.models import Model
import keras
import tensorflow as tf
import numpy as np

def conv_block(inputs, filters, kernel_size=3, strides=1):
    x = Conv2D(filters, kernel_size, strides=strides, padding='same')(inputs)
    x = BatchNormalization()(x)
    x = Activation('relu')(x)
    return x

def encoder_block(inputs, filters, kernel_size=3, strides=1):
    x = conv_block(inputs, filters, kernel_size, strides)
    x = conv_block(x, filters, kernel_size, 1)
    shortcut = Conv2D(filters, kernel_size=1, strides=strides, padding='same')(inputs)
    shortcut = BatchNormalization()(shortcut)
    x = Add()([x, shortcut])
    x = Activation('relu')(x)
    return x

def decoder_block(inputs, filters, kernel_size=3, strides=1):
    x = UpSampling2D(size=(2, 2))(inputs)
    x = conv_block(x, filters, kernel_size, 1)
    x = conv_block(x, filters, kernel_size, 1)
    shortcut = UpSampling2D(size=(2, 2))(inputs)
    shortcut = Conv2D(filters, kernel_size=1, strides=1, padding='same')(shortcut)
    shortcut = BatchNormalization()(shortcut)
    x = Add()([x, shortcut])
    x = Activation('relu')(x)
    return x

def linknet(input_shape=(224, 224, 3), num_classes=1):
    inputs = Input(shape=input_shape)

    # Encoder
    enc1 = encoder_block(inputs, 64, strides=2)
    enc2 = encoder_block(enc1, 128, strides=2)
    enc3 = encoder_block(enc2, 256, strides=2)
    enc4 = encoder_block(enc3, 512, strides=2)

    # Decoder
    dec4 = decoder_block(enc4, 256, strides=2)
    dec3 = decoder_block(dec4, 128, strides=2)
    dec2 = decoder_block(dec3, 64, strides=2)
    dec1 = decoder_block(dec2, 64, strides=2)

    outputs = Conv2D(num_classes, (1, 1), activation='sigmoid')(dec1)

    model = Model(inputs, outputs)
    return model

@keras.saving.register_keras_serializable()
def iou(y_true, y_pred):
    def f(y_true, y_pred):
        intersection = np.sum(y_true * y_pred)
        union = np.sum(y_true) + np.sum(y_pred) - intersection
        x = (intersection + 1e-15) / (union + 1e-15)
        x = x.astype(np.float32)
        return x

    return tf.numpy_function(f, [y_true, y_pred], tf.float32)

@keras.saving.register_keras_serializable()
def dice_coefficient(y_true, y_pred, smooth=1.0):
    intersection = tf.reduce_sum(y_true * y_pred)
    union = tf.reduce_sum(y_true) + tf.reduce_sum(y_pred)
    dice = (2.0 * intersection + smooth) / (union + smooth)
    return dice
@keras.saving.register_keras_serializable()
def dice_coefficient_loss(y_true, y_pred):
    return 1.0 - dice_coefficient(y_true, y_pred)

lr = 1e-4
model = linknet()
opt = tf.keras.optimizers.Adam(lr)
metrics = ["acc", tf.keras.metrics.Recall(), tf.keras.metrics.Precision(), iou,dice_coefficient]
model.compile(loss="binary_crossentropy", optimizer=opt, metrics=metrics)

model.load_weights("linknet_test.h5")

