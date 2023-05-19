import styles from '../Form.module.sass'

import React from 'react'
import { Link } from 'react-router-dom'
import WhatsAppButton from '../WhatsApp'
import ComputerForm from './ComputerForm'

function Computer() {
	return (
		<div className={`${styles.computer} ${'bg'}`}>
			<h1>Bilgisayar Sat</h1>
			<p>
				Bilgisayarınızı satmak için lütfen model ve markayı, işlemciyi,
				<br /> RAM ve sabit disk kapasitesini,
				<br /> grafik cihazını ve varsa ek cihazları belirtin.
			</p>
			<p>Ya da bize WhatsApp numaramıza yazın</p>
			<WhatsAppButton phoneNumber='905444558407' message='Merhaba' />
			<ComputerForm />
			<div className={styles.important}>
				<p>
					<span>Lütfen</span>
				</p>
				<p>Bilgisayarı mümkün olduğunca doğru bir şekilde tanımlayın!!!</p>
			</div>
			<div className={styles.coputerLink}>
				<Link className='router-link' to='/lastrequests'>
					<p className={styles.btn}>Diğer insanların taleplerine göz atın</p>
				</Link>
				<p>
					Sayfaya giderek benzer bir bilgisayar bulabilir ve diğer insanların
					örneklerine dayalı olarak fiyatı öğrenebilirsiniz.
				</p>
			</div>
		</div>
	)
}

export default Computer
