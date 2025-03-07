"use client"
import { CornerDownLeft } from "lucide-react"

const SendButton = (props) => {
  return (
    <button className="react-chatbot-kit-chat-btn-send" onClick={props.onClick} aria-label="Send message">
      <CornerDownLeft size={24} strokeWidth={2.5} color="white" /> 
    </button>
  )
}

export default SendButton

