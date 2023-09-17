import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styles from '../Form.module.sass'
import WhatsAppButton from '../WhatsApp'
import MonitorForm from './MonitorForm'

function Monitor() {
	return (
		<div className={`${styles.computer} ${'bg'}`}>
			<Helmet>
				<title>Monitör Sat - PCRef.site</title>
				<meta
					name='description'
					content='Monitörünüzü hızlı ve güvenli bir şekilde satın. Marka ve modeli belirtin veya bize WhatsApp üzerinden yazın.'
				/>
				<meta
					name='keywords'
					content='Monitör Sat, ikinci El Monitör Alan Yerler, 2 El Sıfır Monitör Alım Merkezi Degerinde Satmak, monitör alan yerler, monitörümü satmak istiyorum, Güvenli Monitör Alışverişi, NASIL MONİTÖR SATIN ALIYORUZ?, Monitör Fiyatlandırma, ANINDA MONİTÖR ALIM HIZMETI'
				/>
			</Helmet>
			<h1>Monitör Sat</h1>
			<p>
				Monitörünüzü satmak için lütfen marka ve modeli, varsa ek cihazları
				belirtin.
			</p>
			<p>Ya da bize WhatsApp numaramıza yazın</p>
			<WhatsAppButton phoneNumber='905444558407' message='Merhaba' />
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
