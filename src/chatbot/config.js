import { createChatBotMessage } from "react-chatbot-kit";

const botName = 'A.S.';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#6ca7bd',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config