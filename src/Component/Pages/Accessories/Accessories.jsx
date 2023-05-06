import styles from "../Form.module.sass";

import React from 'react'

import { Link } from 'react-router-dom';
import AccessoriesForm from './AccessoriesForm';

function Accessories() {
    return (
        <div className={`${"bg"} ${styles.accessories} ${styles.computer}`} >
            <h1>Продать комплектующие от компьютера</h1>
            <p>
                Пожалуйста выберите какую запчасть хотите продать.
            </p>
            <p>
                Если есть все запчасти из списка ниже воспользуйтесь <Link className='router-link' to='/computer'><span>этой формой</span></Link>.
            </p>
            <p>
                Если у Вас есть только процессор или видеокарта то в остальные поля впишите слово "НЕТ".
            </p>

            <AccessoriesForm />
            <div className={styles.important}>
                <p><span>Пожалуйста</span></p>
                <p>Опишите компьютер максимально точно!!!</p>
            </div>
            <div className={styles.coputerLink}>
                <Link className='router-link' to='/lastrequestsacess'><div className={styles.btn} >Смотреть запросы других людей</div></Link>
                <p>Перейдя на страницу вы можете найти похожий компьютер и узнать цену на примере других людей.</p>
            </div>

        </div>
    )
}

export default Accessories