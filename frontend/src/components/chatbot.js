import React, { useEffect } from "react";
import "./chatbot.css";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Type hi to start conversation",
        botConversationDescription: "this bot can answer your queries",
        botId: "a622f8b3-aa31-49cc-b316-9f13e3a2a12c",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "a622f8b3-aa31-49cc-b316-9f13e3a2a12c",
        webhookId: "df9cfa28-3c0e-427d-9363-f62247414ffa",
        lazySocket: true,
        themeName: "prism",
        botName: "CureTech bot",
        avatarUrl:
          "https://www.clipartmax.com/png/small/54-544553_doctor-free-icon-doctor-flat-icon-png.png",
        frontendVersion: "v1",
        useSessionStorage: true,
        enableConversationDeletion: true,
        theme: "prism",
        themeColor: "#2563eb",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
