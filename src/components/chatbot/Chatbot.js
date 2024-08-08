import React, { useState } from 'react';
import styles from './Chatbot.module.scss';
import axios from 'axios';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen); // This toggles the state of the popup
  };

  const handleSend = async (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      const userMessage = event.target.value;
      const newMessages = [...messages, { text: userMessage, sender: 'user' }];
      setMessages(newMessages);

      // Clear input after sending
      event.target.value = '';

      try {
        // Make a request to the backend API
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/query_publications/?query=${userMessage}`,{
          headers:{'Content-Type':'application/json'}
        });
        
        // Debugging: Log the response data to see what is being returned
        console.log('Response from backend:', response.data.results);

        // Get the response data
        const botResponse = response.data.results;

        if (Array.isArray(botResponse)) {
          // Update messages with the bot response
          const formattedBotMessages = botResponse.map(result => ({ text: result, sender: 'bot' }));
          setMessages([...newMessages, ...formattedBotMessages]);
        } else if (typeof botResponse === 'string') {
          // Handle string response format
          setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format from backend. Expected an array or a string.');
          setMessages([...newMessages, { text: 'Unexpected response format from backend.', sender: 'bot' }]);
        }
      } catch (error) {
        // Handle error (you can show an error message to the user here)
        console.error('Error fetching response from backend:', error);
        setMessages([...newMessages, { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' }]);
      }
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
