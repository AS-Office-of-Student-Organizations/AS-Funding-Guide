import js from "@eslint/js";
import { getAuth } from "firebase/auth";

/**
 * Format for messages sent to the server:
 * It's a json with email question and conversation_history
 * Conversation history is an array of messages, each message is an object
 * with the following fields:
 * message: the message text, type: 'user' or 'bot', 'id': rnaodm id
 * and it may have the state loading for bot messages (which can be ignored)
 * and the delay field which should also be ignored.
 * 
 * Format for response from the server:
 * It's a json with a response field which is the bot's response.
 */


class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  talk = async (message) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      const errorMessage = this.createChatBotMessage("You must be logged in.");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
      return;
    }

    try {
      const token = await user.getIdToken(); // 🔹 Fetch Firebase token

      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔹 Include Firebase token
        },
        body: JSON.stringify({ 
          question: message,
          email: user.email,
          conversation_history: this.stateRef.messages,
        }),
      });

      console.log(JSON.stringify({
        question: message,
        email: user.email,
        conversation_history: this.stateRef.messages
      }));

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      const botMessage = this.createChatBotMessage(data.response);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = this.createChatBotMessage(
        "Sorry, authentication failed or something went wrong."
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
}

export default ActionProvider;

