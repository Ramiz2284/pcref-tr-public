import styles from "../Form.module.sass";

import React from 'react'
import { Link } from 'react-router-dom';
import LaptopsForm from './LaptopForm';

function Laptops() {
    return (
        <div className={`${styles.computer} ${"bg"}`} >
            <h1>Продать ноутбук</h1>
            <p>
                Чтобы продать ваш ноутбук, пожалуйста, укажите модель и марку, дополнительные устройства, если есть.
            </p>
            <LaptopsForm />
            <div className={styles.important}>
                <p><span>Пожалуйста</span></p>
                <p>Опишите ноутбук максимально подробно!!!</p>
            </div>
            <div className={styles.coputerLink}>
                <Link className='router-link' to='/lastrequestslaptop'><p className={styles.btn} >Смотреть запросы других людей</p></Link>
                <p>Перейдя на страницу вы можете найти похожий ноутбук и узнать цену на примере других людей.</p>
            </div>

        </div>
    )
}

export default Laptops