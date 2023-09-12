import React, { useState } from 'react'
import accessories from '../../../img/accessories.jpg'
import iphone from '../../../img/iphone.jpeg'
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
		img: iphone,
		title: 'Cep telefon',
		categiry: 'iphone',
	},

	{
		img: pc,
		title: 'Bilgisayar',
		categiry: 'android',
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
				<a className='link' href='https://wa.me/905444558407'>
					<h3>WhatsApp ile Sat</h3>
					<p>Sadece biz değerlendireceğiz ve en iyi fiyatı teklif edeceğiz</p>
				</a>
				{selectedCategory === 'iphone' ? (
					<Link className='link' to={`/${selectedCategory}`}>
						<h3>Bilmeniz Gerekenler</h3>
					</Link>
				) : (
					<Link className='link' to={`/${selectedCategory}`}>
						<h3>Açık artırmaya gönder</h3>
						<p>Ürününüzü gören tüm alıcılar değerlendirecek</p>
					</Link>
				)}
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
