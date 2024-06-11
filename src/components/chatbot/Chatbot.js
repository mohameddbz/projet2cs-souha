import React , {useState} from 'react'
import styles from './Chatbot.module.scss';
function Chatbot() {

  return (
    <img
                  className={styles.chatbotIcon}
                  src={"/assets/chatbot.svg"}
                  alt="alt text"
                />
  );
}
export default Chatbot;