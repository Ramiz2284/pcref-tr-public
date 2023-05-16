import React, { useState } from 'react'
import accessories from '../../../img/accessories.jpg'
import laptop from '../../../img/laptop.jpg'
import monitors from '../../../img/monitors.jpg'
import pc from '../../../img/pc.jpg'
import Popup from '../Popup/homePopup'
import styles from './Home.module.sass'

import {
	faHandshake,
	faLaptop,
	faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const homeCard = [
	{
		img: pc,
		title: 'Bilgisayar',
		categiry: 'computer',
	},
	{
		img: accessories,
		title: 'Bileşenler',
		categiry: 'accessories',
	},
	{
		img: monitors,
		title: 'Monitörler',
		categiry: 'monitors',
	},
	{
		img: laptop,
		title: 'Dizüstü Bilgisayarlar',
		categiry: 'laptops',
	},
]

function Home() {
	const [isOpen, setIsOpen] = useState(false)

	const [selectedCategory, setSelectedCategory] = useState('')

	const handleOpen = category => {
		setSelectedCategory(category)
		setIsOpen(true)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<div className={`${styles.home} ${'bg'}`}>
			<div className={styles.stepWrapp}>
				<div>
					<FontAwesomeIcon className={styles.stepIcon} icon={faLaptop} />
					<p className={styles.step}>Bilgisayarınızı tanımlayın</p>
				</div>
				<div>
					<FontAwesomeIcon className={styles.stepIcon} icon={faMoneyBillAlt} />
					<p className={styles.step}>
						Alıcılar tarafından fiyat teklifleri alın
					</p>
				</div>
				<div>
					<FontAwesomeIcon className={styles.stepIcon} icon={faHandshake} />
					<p className={styles.step}>Bilgisayarınızı en iyi şartlarda satın</p>
				</div>
			</div>

			<Popup isOpen={isOpen} onClose={handleClose}>
				<a
					className='link'
					href='https://wa.me/905444558407?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5.%20%D0%AF%20%D0%BF%D0%BE%20%D0%BF%D0%BE%D0%B2%D0%BE%D0%B4%D1%83%20%D1%81%D0%BA%D1%83%D0%BF%D0%BA%D0%B8'
				>
					<h3>WhatsApp ile Sat</h3>
					<p>Sadece biz değerlendireceğiz ve en iyi fiyatı teklif edeceğiz</p>
				</a>
				<Link className='link' to={`/${selectedCategory}`}>
					<h3>Açık artırmaya gönder</h3>
					<p>Ürününüzü gören tüm alıcılar değerlendirecek</p>
				</Link>
			</Popup>
			<div className={styles.cards}>
				{homeCard.map(el => (
					<div
						onClick={() => handleOpen(el.categiry)}
						key={el.categiry}
						className={`${styles.homecards} ${'shadow'}`}
					>
						<img src={el.img} alt={el.title} />
						<p>{el.title}</p>
					</div>
				))}
			</div>

			<div className={styles.homeTitle}>
				<h1>Hoşgeldiniz!!!</h1>
				<h2>
					Burada bilgisayarınızı, bileşenlerinizi veya dizüstü bilgisayarınızı
					değerlendirebilir ve satabilirsiniz.
				</h2>
				<p>
					Başlamak için, lütfen değerlendirmek veya satmak istediğiniz şeyi
					seçin.
				</p>
			</div>
		</div>
	)
}

export default Home
