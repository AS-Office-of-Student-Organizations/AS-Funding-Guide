import { AlertTriangle, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const { role, content, isError } = message;

  return (
    <div className={`chat-message ${role === 'user' ? 'user-message' : 'bot-message'}`}>
      {role === 'bot' && (
        <div className="bot-avatar">
          <img src="/AS_Logo_StudentOrgs.png" alt="Bot Avatar" />
        </div>
      )}

      <div className={`message-content ${isError ? 'error' : ''}`}>
        {isError && <AlertTriangle size={16} className="error-icon" />}
        {content}
      </div>

      {role === 'user' && (
        <div className="user-avatar">
          <User size={16} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
