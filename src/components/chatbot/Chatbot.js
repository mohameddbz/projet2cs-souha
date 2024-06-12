import React, { useState } from 'react';
import styles from './Chatbot.module.scss';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen); // This toggles the state of the popup
  };

  const handleSend = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      const newMessages = [...messages, { text: event.target.value, sender: 'user' }];
      setMessages(newMessages);

      // Simulate a response from the chatbot
      setTimeout(() => {
        setMessages([...newMessages, { text: "Ceci est une réponse automatique.", sender: 'bot' }]);
      }, 1000);

      event.target.value = ''; // Clear input after send
    }
  };

  return (
    <>
      {!isOpen && ( // Only display the chatbot icon if the popup is not open
        <img
          className={styles.chatbotIcon}
          src={"/assets/chatbot.svg"}
          alt="Chat with us!"
          onClick={togglePopup}
        />
      )}
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            ChatBot
            <button onClick={togglePopup} className={styles.closeButton}>×</button>
          </div>
          <div className={styles.popupContent}>
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div key={index} className={styles[msg.sender]}>{msg.text}</div>
              ))}
            </div>
          </div>
          <div className={styles.messageInputContainer}>
            <input
              className={styles.messageInput}
              type="text"
              placeholder="Tapez votre message..."
              onKeyPress={handleSend}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
