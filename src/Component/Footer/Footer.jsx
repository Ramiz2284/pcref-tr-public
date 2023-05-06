
import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Footer.module.sass";

function Footer() {
    return (
        <footer>
            <div className={styles.logo}>
                <p>PC </p>
                <p> auction</p>
            </div>
            <div className={styles.contactInfo}>
                <p>Email: pcauction@mail.ru</p>
                {/* <p>Phone: 555-555-5555</p> */}
            </div>
            <div className={styles.feedbackLink}>
                <Link className={styles.Link} to="/politica"> Политика конфиденциальности</Link>
            </div>
        </footer>
    );
}

export default Footer;
