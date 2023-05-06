import styles from "../Form.module.sass";

import React from 'react'
import ComputerForm from './ComputerForm'
import { Link } from 'react-router-dom';

function Computer() {
    return (
        <div className={`${styles.computer} ${"bg"}`} >
            <h1>Продать компьютер</h1>
            <p>
                Чтобы продать ваш компьютер, пожалуйста, укажите модель и марку,  процессор,<br /> объем оперативной памяти и жесткого диска,<br /> графическое устройство и дополнительные устройства, если есть.
            </p>
            <ComputerForm />
            <div className={styles.important}>
                <p><span>Пожалуйста</span></p>
                <p>Опишите компьютер максимально точно!!!</p>
            </div>
            <div className={styles.coputerLink}>
                <Link className='router-link' to='/lastrequests'><p className={styles.btn} >Смотреть запросы других людей</p></Link>
                <p>Перейдя на страницу вы можете найти похожий компьютер и узнать цену на примере других людей.</p>
            </div>

        </div>
    )
}

export default Computer