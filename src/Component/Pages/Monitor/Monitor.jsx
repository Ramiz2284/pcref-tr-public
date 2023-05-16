import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Form.module.sass'
import MonitorForm from './MonitorForm'

function Monitor() {
	return (
		<div className={`${styles.computer} ${'bg'}`}>
			<h1>Monitör Sat</h1>
			<p>
				Monitörünüzü satmak için lütfen marka ve modeli, varsa ek cihazları
				belirtin.
			</p>
			<MonitorForm />
			<div className={styles.important}>
				<p>
					<span>Lütfen</span>
				</p>
				<p>Monitörü mümkün olduğunca doğru bir şekilde tanımlayın!!!</p>
			</div>
			<div className={styles.coputerLink}>
				<Link className='router-link' to='/lastrequestsmonitors'>
					<p className={styles.btn}>Diğer insanların isteklerini gör</p>
				</Link>
				<p>
					Sayfaya giderek benzer bir monitör bulabilir ve diğer insanların
					örneklerine göre fiyatı öğrenebilirsiniz.
				</p>
			</div>
		</div>
	)
}

export default Monitor
