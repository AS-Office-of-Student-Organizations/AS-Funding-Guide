// ActionProvider starter code
//test
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
   talk = (message) => {
    fetch("http://127.0.0.1:8000/query", { // change to deployed IP
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessage = this.createChatBotMessage(data.response);
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      })
      .catch((error) => {
        const errorMessage = this.createChatBotMessage(
          "Sorry, something went wrong."
        );
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, errorMessage],
        }));
      });
 }
}
 

 export default ActionProvider;