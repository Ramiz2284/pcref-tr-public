
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../Redux/LoginSlice';

import styles from './Popap.module.sass';

const Popap = () => {

    const isAuth = useSelector(selectIsAuth);

    if (isAuth) {
        return (
            <div className={styles.poap_container}>
                <div className={styles.poap_title}>
                    <p>Пожалуйста проверьте почту и перейдите по ссылке для активации аккаунта!!!</p>

                </div>
            </div>
        )
    }




    return (
        <div className={styles.poap_container}>
            <div className={styles.poap_title}>
                <p>Требуется регистрация и активация аккаунта по почте!!!</p>
                <p>Важно указать реальный email@!!!</p>
                <p>Ответ с ценой придет на почту!!!</p>
            </div>
        </div>
    );
};

export default Popap;
