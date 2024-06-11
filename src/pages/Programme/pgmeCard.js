import React from 'react';
import styles from './ProgrammeFinal.module.scss'
import { Link } from 'react-router-dom';
const PgmeCard = ({ title }) => {
    return (
        <div className={styles.pgmeCardContainer}>
            <img className={styles.imgPgmeCard} src={'/assets/imgPgmeCard.png'} alt="alt text" />
            <h2 className={styles.textPgmeCard}>{title}</h2>
            <div className={styles.buttonCardContainer}>
                <Link to='/DetailsPgme'><button className={styles.buttonCard}>1CP</button></Link>
                <Link to='/DetailsPgme'><button className={styles.buttonCard}>2CP</button></Link>
            </div>
            <img className={styles.infoPgmeCard} src='/assets/infoPgmeCard.svg'/>
        </div>
    );
};

export default PgmeCard;
