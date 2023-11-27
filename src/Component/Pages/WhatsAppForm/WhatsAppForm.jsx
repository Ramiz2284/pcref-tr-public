import React, { useState } from 'react'
import styles from './WhatsAppForm.module.sass'

const WhatsAppForm = () => {
	const [productType, setProductType] = useState('')
	const [formData, setFormData] = useState({})
	// const history = useHistory()

	const handleProductTypeChange = event => {
		setProductType(event.target.value)
		setFormData({}) // Очищаем форму при смене типа продукта
	}

	const handleSubmit = event => {
		event.preventDefault()

		// Формируем сообщение на основе данных формы
		let message = `Merhaba, aşağıdaki ürünü satmak istiyorum: ${productType}\n`
		for (const [key, value] of Object.entries(formData)) {
			// Добавляем каждый элемент данных формы в сообщение
			message += `${key}: ${value}\n`
		}

		// Кодируем сообщение для URL
		const encodedMessage = encodeURIComponent(message)

		// Создаем URL для WhatsApp
		const waLink = `https://wa.me/905444558407?text=${encodedMessage}`

		// Открываем ссылку в новой вкладке или перенаправляем пользователя на неё
		window.open(waLink, '_blank')

		// Опционально: Перенаправляем пользователя на страницу подтверждения
		// history.push('/confirmation');
	}

	return (
		<div className={styles.formContainer}>
			<h1>Ürün Bilgilerini WhatsApp Üzerinden Gönderin</h1>
			<p>
				Lütfen satmak istediğiniz bilgisayar, laptop veya bileşenlerin
				özelliklerini ve açıklamalarını aşağıdaki forma giriniz. Eğer
				bilmiyorsanız veya emin değilseniz ilgili alanları boş bırakabilirsiniz.
				Formu doldurduktan sonra, bilgileriniz doğrudan WhatsApp üzerinden bize
				iletilecektir.
			</p>
			<form onSubmit={handleSubmit}>
				<select value={productType} onChange={handleProductTypeChange}>
					<option value=''>Ürün tipini seçin</option>
					<option value='laptop'>Laptop</option>
					<option value='pc'>Masaüstü Bilgisayar</option>
					<option value='completePc'>Set Bilgisayar</option>
					<option value='monitor'>Monitör</option>
					<option value='accessories'>Bilgisayar Bileşenleri</option>
				</select>

				{/* Дальше идут условные рендеры для отображения соответствующих полей ввода */}
				{productType === 'laptop' && (
					<div className={styles.formField}>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Laptop marka ve modeli'
							onChange={e =>
								setFormData({ ...formData, model: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='İşlemci (örn., Intel i5-1135G7)'
							onChange={e =>
								setFormData({ ...formData, processor: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Ekran kartı (örn., NVIDIA GTX 1650)'
							onChange={e => setFormData({ ...formData, gpu: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='RAM (örneğin, 32GB DDR4)'
							onChange={e => setFormData({ ...formData, ram: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder=' SSD, örneğin, 500GB'
							onChange={e =>
								setFormData({ ...formData, storage: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Ekran boyutu (örn., 15.6 inç)'
							onChange={e =>
								setFormData({ ...formData, screenSize: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Maksimum çözünürlük (örneğin, 1920x1080)'
							onChange={e =>
								setFormData({ ...formData, screenResolution: e.target.value })
							}
						/>
						<textarea
							placeholder='Ek bilgi (örneğin, pil durumu, şarj cihazının bulunması, özel hasarlar)
'
							onChange={e =>
								setFormData({ ...formData, additionalInfo: e.target.value })
							}
						></textarea>
					</div>
				)}

				{productType === 'pc' && (
					<div className={styles.formField}>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Anakart marka ve modeli'
							onChange={e =>
								setFormData({ ...formData, motherboard: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='İşlemci (örneğin, Intel i7-9700K)'
							onChange={e => setFormData({ ...formData, cpu: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Ekran kartı (örneğin, NVIDIA RTX 2070)'
							onChange={e => setFormData({ ...formData, gpu: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='RAM (örneğin, 32GB DDR4)'
							onChange={e => setFormData({ ...formData, ram: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Sabit disk (örneğin, 2TB HDD)'
							onChange={e => setFormData({ ...formData, hdd: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='SSD, örneğin, 256GB'
							onChange={e => setFormData({ ...formData, ssd: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Güç kaynağı (örneğin, 650W)'
							onChange={e => setFormData({ ...formData, psu: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Kasa (açıklama veya model)'
							onChange={e => setFormData({ ...formData, case: e.target.value })}
						/>
						<textarea
							placeholder='Ek bilgi (örneğin, soğutma varlığı, durum, modifikasyonlar)'
							onChange={e =>
								setFormData({ ...formData, additionalInfo: e.target.value })
							}
						></textarea>
					</div>
				)}

				{productType === 'completePc' && (
					<div className={styles.formField}>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Bilgisayar kasası marka ve modeli'
							onChange={e =>
								setFormData({ ...formData, pcModel: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='İşlemci (örneğin, Intel i7-9700K)'
							onChange={e => setFormData({ ...formData, cpu: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Ekran kartı (örneğin, NVIDIA RTX 2070)'
							onChange={e => setFormData({ ...formData, gpu: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='RAM (örneğin, 32GB DDR4)'
							onChange={e => setFormData({ ...formData, ram: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Sabit disk (örneğin, 2TB HDD)'
							onChange={e => setFormData({ ...formData, hdd: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='SSD, örneğin, 500GB'
							onChange={e => setFormData({ ...formData, ssd: e.target.value })}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Monitör modeli'
							onChange={e =>
								setFormData({ ...formData, monitorModel: e.target.value })
							}
						/>
						<div className={styles.checkbox}>
							<div>
								<input
									type='checkbox'
									onChange={e =>
										setFormData({
											...formData,
											keyboardIncluded: e.target.checked,
										})
									}
								/>{' '}
								<p>Klavye </p>
							</div>
							<div>
								<input
									type='checkbox'
									onChange={e =>
										setFormData({
											...formData,
											mouseIncluded: e.target.checked,
										})
									}
								/>{' '}
								<p>Mouse </p>
							</div>
							<div>
								<input
									type='checkbox'
									onChange={e =>
										setFormData({
											...formData,
											speakersIncluded: e.target.checked,
										})
									}
								/>{' '}
								<p>Hoparlörler </p>
							</div>

							<div>
								<input
									type='checkbox'
									onChange={e =>
										setFormData({
											...formData,
											headphonesIncluded: e.target.checked,
										})
									}
								/>{' '}
								<p>Kulaklık </p>
							</div>
						</div>
						<textarea
							placeholder='Ek bilgi (örneğin, işletim sistemi varlığı, yazılım, özel özellikler)'
							onChange={e =>
								setFormData({ ...formData, additionalInfo: e.target.value })
							}
						></textarea>
					</div>
				)}

				{productType === 'monitor' && (
					<div className={styles.formField}>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Monitör marka ve modeli'
							onChange={e =>
								setFormData({ ...formData, monitorModel: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Ekran boyutu (örneğin, 24 inç)'
							onChange={e =>
								setFormData({ ...formData, screenSize: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Panel tipi (örneğin, IPS, TN, VA)'
							onChange={e =>
								setFormData({ ...formData, panelType: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Maksimum çözünürlük (örneğin, 1920x1080)'
							onChange={e =>
								setFormData({ ...formData, resolution: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Yenileme hızı (örneğin, 144Hz)'
							onChange={e =>
								setFormData({ ...formData, refreshRate: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Tepki süresi (örneğin, 1ms)'
							onChange={e =>
								setFormData({ ...formData, responseTime: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Bağlantı arayüzleri (örneğin, HDMI, DisplayPort, VGA)'
							onChange={e =>
								setFormData({ ...formData, ports: e.target.value })
							}
						/>
						<textarea
							placeholder='Ek özellikler (örneğin, G-Sync, FreeSync, dahili hoparlörler)'
							onChange={e =>
								setFormData({ ...formData, additionalFeatures: e.target.value })
							}
						></textarea>
						<textarea
							placeholder='Aksesuarların durumu ve varlığı (örneğin, stand varlığı, kasa durumu)'
							onChange={e =>
								setFormData({
									...formData,
									conditionAndAccessories: e.target.value,
								})
							}
						></textarea>
					</div>
				)}

				{productType === 'accessories' && (
					<div className={styles.formField}>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Bileşen tipi (örn., RAM, HDD, SSD)'
							onChange={e =>
								setFormData({ ...formData, accessoryType: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Bileşenin markası ve modeli'
							onChange={e =>
								setFormData({ ...formData, model: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Teknik özellikler (örneğin, 8GB RAM, 7200rpm HDD)'
							onChange={e =>
								setFormData({ ...formData, specs: e.target.value })
							}
						/>
						<input
							type='text'
							className={styles.inputField}
							placeholder='Durum (yeni, ikinci el, tamir gerekiyor)'
							onChange={e =>
								setFormData({ ...formData, condition: e.target.value })
							}
						/>
						<textarea
							placeholder='Ek bilgi (örneğin, uyumluluk, garanti varlığı)
'
							onChange={e =>
								setFormData({ ...formData, additionalInfo: e.target.value })
							}
						></textarea>
					</div>
				)}

				<button className={styles.submitButton} type='submit'>
					Gönder
				</button>
			</form>
		</div>
	)
}

export default WhatsAppForm
