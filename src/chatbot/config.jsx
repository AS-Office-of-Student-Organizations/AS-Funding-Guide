"use client"

import { createChatBotMessage } from "react-chatbot-kit"
import { CornerDownLeft } from "lucide-react"

const botName = "A.S."

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
  },
  customComponents: {
    botAvatar: (props) => (
      <div className="react-chatbot-kit-chat-bot-avatar-container">
        <span>AS</span>
      </div>
    ),
    // Define the send button directly in the config
    sendButton: (props) => (
      <button className="react-chatbot-kit-chat-btn-send" onClick={props.onClick} aria-label="Send message">
        <CornerDownLeft size={24} strokeWidth={2.5} color="white" />
      </button>
    ),
  },
  state: {
    gist: "",
    infoBox: false,
  },
}

export default config

