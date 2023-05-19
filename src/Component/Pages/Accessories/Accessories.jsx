import styles from '../Form.module.sass'

import React from 'react'

import { Link } from 'react-router-dom'
import WhatsAppButton from '../WhatsApp'
import AccessoriesForm from './AccessoriesForm'

function Accessories() {
	return (
		<div className={`${'bg'} ${styles.accessories} ${styles.computer}`}>
			<h1>Bilgisayardan bileşenleri satın</h1>
			<p>Lütfen hangi yedek parçayı satmak istediğinizi seçin.</p>
			<p>
				Aşağıdaki listedeki tüm parçalar varsa{' '}
				<Link className='router-link' to='/computer'>
					<span>lütfen bu formu kullanın</span>
				</Link>
				.
			</p>
			<p>
				Yalnızca bir işlemciniz veya ekran kartınız varsa, diğer alanlara "YOK"
				yazın.
			</p>
			<p>Ya da bize WhatsApp numaramıza yazın</p>
			<WhatsAppButton phoneNumber='905444558407' message='Merhaba' />
			<AccessoriesForm />
			<div className={styles.important}>
				<p>
					<span>Lütfen</span>
				</p>
				<p> Bilgisayarı olabildiğince doğru bir şekilde tanımlayın!</p>
			</div>
			<div className={styles.coputerLink}>
				<Link className='router-link' to='/lastrequestsacess'>
					<div className={styles.btn}>
						Diğer insanların isteklerini görüntüleyin
					</div>
				</Link>
				<p>
					Sayfaya giderek benzer bir bilgisayar bulabilir ve diğer insanların
					örneklerinden fiyatı öğrenebilirsiniz.
				</p>
			</div>
		</div>
	)
}

export default Accessories
