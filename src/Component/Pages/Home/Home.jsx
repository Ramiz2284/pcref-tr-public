

import React from 'react'
// import { useSelector } from "react-redux";

import pc from '../../../img/pc.jpg';
import accessories from '../../../img/accessories.jpg';
import monitors from '../../../img/monitors.jpg';
import laptop from '../../../img/laptop.jpg';
import { Link } from 'react-router-dom';
import styles from "./Home.module.sass";
// import { selectIsAuth } from '../../Redux/LoginSlice';

// import { library, } from '@fortawesome/fontawesome-svg-core';
import { faHandshake, faLaptop, faMoneyBillAlt, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const homeCard = [
    {
        img: pc,
        title: 'Компьютер',
        categiry: 'computer'
    },
    {
        img: accessories,
        title: 'Комплектующие',
        categiry: 'accessories'
    },
    {
        img: monitors,
        title: 'Мониторы',
        categiry: 'monitors'
    },
    {
        img: laptop,
        title: 'Ноутбуки',
        categiry: 'laptops'
    },
]

function Home() {

    // const isAuth = useSelector(selectIsAuth);

    // if (isAuth) {
    //     const { isActivated } = isAuth;
    //     if (!isActivated) {
    //         return (
    //             <>
    //                 <div className={styles.notActiv_wrap}>
    //                     <h1 className={styles.notActiv}>Пожалуйста актевируйте аккаунт</h1>
    //                     <p className={styles.notActiv_pf}>Для просмотра этого содержимого требуется активация аккаунта. </p>
    //                     <p className={styles.notActiv_pf}>Пожалуйста, пройдите по ссылке в отправленном на вашу электронную почту письме для активации вашего аккаунта.</p>
    //                 </div>
    //             </>
    //         )
    //     }

    // } else {
    //     return (
    //         <>
    //             <div className={styles.notActiv_wrap}>
    //                 <h1 className={styles.notActiv}>Для просмотра этого содержимого требуется регистрация.</h1>
    //             </div>

    //         </>
    //     )
    // }


    return (
        <div className={`${styles.home} ${'bg'}`} >
            <div className={styles.stepWrapp}>
                <div>
                    <FontAwesomeIcon className={styles.stepIcon} icon={faLaptop} />
                    <p className={styles.step}>
                        Опишите свой компьютер
                    </p>
                </div>
                <div>
                    <FontAwesomeIcon className={styles.stepIcon} icon={faMoneyBillAlt} />
                    <p className={styles.step}>
                        Получите ценовые предложения от скупщиков
                    </p>
                </div>
                <div>
                    <FontAwesomeIcon className={styles.stepIcon} icon={faHandshake} />
                    <p className={styles.step}>
                        Продайте свой компьютер на лучших условиях
                    </p>
                </div>
            </div>

            <div className={styles.cards}>

                {homeCard.map(el => (

                    <Link className="router-link" to={`/${el.categiry}`} key={el.categiry}>
                        <div className={`${styles.homecards} ${"shadow"}`} >
                            <img src={el.img} alt={el.title} />
                            <p>
                                {el.title}
                            </p>
                        </div>
                    </Link>

                ))}

            </div>


            <div className={styles.homeTitle}>
                <h1>Добро пожаловать!!!</h1>
                <h2>Здесь Вы можете оценить и продать свой компьютер комплектующие или ноутбук</h2>
                <p>
                    Для начала, пожалуйста, выберите то, что хотите оценить или продать.
                </p>
            </div>
        </div>
    )
}

export default Home