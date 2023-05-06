
import styles from "../Form.module.sass";
import React from 'react'
import { Link } from 'react-router-dom';
import MonitorForm from './MonitorForm';

function Monitor() {
    return (
        <div className={`${styles.computer} ${"bg"}`} >
            <h1>Продать монитор</h1>
            <p>
                Чтобы продать ваш монитор, пожалуйста, укажите модель и марку, дополнительные устройства, если есть.
            </p>
            <MonitorForm />
            <div className={styles.important}>
                <p><span>Пожалуйста</span></p>
                <p>Опишите монитор максимально точно!!!</p>
            </div>
            <div className={styles.coputerLink}>
                <Link className='router-link' to='/lastrequestsmonitors'><p className={styles.btn} >Смотреть запросы других людей</p></Link>
                <p>Перейдя на страницу вы можете найти похожий монитор и узнать цену на примере других людей.</p>
            </div>

        </div>
    )
}

export default Monitor