import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./SuccessStories.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";


function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function ArticleCard({ articlePath }) {
 

  return (
    <div className={styles.centeredSlide}>
        <div className={styles.articleCard}>
    <img className={styles.alumniArticle} src={articlePath} alt="alt text" />
    
    </div>
    </div>
    
  );
}

ArticleCard.propTypes = {
  articlePath: PropTypes.string.isRequired,
};

export default ArticleCard;
