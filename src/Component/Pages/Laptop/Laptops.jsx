import styles from '../Form.module.sass'

import React from 'react'
import { Link } from 'react-router-dom'
import LaptopsForm from './LaptopForm'

function Laptops() {
	return (
		<div className={`${styles.computer} ${'bg'}`}>
			<h1>Dizüstü Bilgisayar Sat</h1>
			<p>
				Dizüstü bilgisayarınızı satmak için lütfen marka ve modeli, varsa ek
				cihazları belirtin.
			</p>
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
