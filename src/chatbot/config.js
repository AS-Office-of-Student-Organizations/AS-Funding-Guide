"use client"

import { createChatBotMessage } from "react-chatbot-kit"

const botName = "A.S."

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
  },
  state: {
    gist: "",
    infoBox: false,
  },
}

export default config

