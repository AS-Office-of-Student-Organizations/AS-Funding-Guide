import { getAuth } from "firebase/auth";

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
        body: JSON.stringify({ question: message }),
      });

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
