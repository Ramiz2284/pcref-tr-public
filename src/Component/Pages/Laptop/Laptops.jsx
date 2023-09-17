import styles from '../Form.module.sass'

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import WhatsAppButton from '../WhatsApp'
import LaptopsForm from './LaptopForm'

function Laptops() {
	return (
		<div className={`${styles.computer} ${'bg'}`}>
			<Helmet>
				<title>Dizüstü Bilgisayar Sat - pcref.site</title>
				<meta
					name='description'
					content='Dizüstü bilgisayarınızı satmak için lütfen marka ve modeli, varsa ek cihazları belirtin. Ya da bize WhatsApp numaramıza yazın.'
				/>
				<meta
					name='keywords'
					content='Dizüstü Bilgisayar Sat, ikinci El Laptop Alan Yerler, 2 El Sıfır Laptop Macbook Alım Merkezi Degerinde Satmak, laptop alan yerler, laptobumu satmak istiyorum'
				/>
			</Helmet>
			<h1>Dizüstü Bilgisayar Sat</h1>
			<p>
				Dizüstü bilgisayarınızı satmak için lütfen marka ve modeli, varsa ek
				cihazları belirtin.
			</p>
			<p>Ya da bize WhatsApp numaramıza yazın</p>
			<WhatsAppButton phoneNumber='905444558407' message='Merhaba' />
			<LaptopsForm />
			<div className={styles.important}>
				<p>
					<span>Lütfen</span>
				</p>
				<p>Dizüstü bilgisayarı mümkün olduğunca detaylı anlatın!!!</p>
			</div>
			<div className={styles.coputerLink}>
				<Link className='router-link' to='/lastrequestslaptop'>
					<p className={styles.btn}>Diğer insanların taleplerini gör</p>
				</Link>
				<p>
					Sayfaya giderek benzer bir dizüstü bilgisayar bulabilir ve diğer
					insanların örneğine göre fiyatı öğrenebilirsiniz.
				</p>
			</div>
		</div>
	)
}

export default Laptops
