import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../Redux/LoginSlice'

import styles from './Popap.module.sass'

const Popap = () => {
	const isAuth = useSelector(selectIsAuth)

	if (isAuth) {
		return (
			<div className={styles.poap_container}>
				<div className={styles.poap_title}>
					<p>
						Lütfen e-postanızı kontrol edin ve hesabı etkinleştirmek için
						bağlantıya gidin!!!
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.poap_container}>
			<div className={styles.poap_title}>
				<p>E-posta ile hesap kaydı ve aktivasyonu gereklidir!!!</p>
				<p>Gerçek bir e-posta@ belirtmek önemlidir!!!</p>
				<p>Fiyat cevabı e-postaya gelecek!!!</p>
			</div>
		</div>
	)
}

export default Popap
