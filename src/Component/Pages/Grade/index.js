import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { ratedСard } from '../../Redux/EstimateSlice'
import axios from '../../Redux/axios'
import styles from './Grade.module.sass'

const phoneRegex = /^[0-9]{10}$/

const countries = [
	{ name: 'Rusya, Kazakistan', code: '7' },
	{ name: 'Ukrayna', code: '380' },
	{ name: 'Türkiye', code: '90' },
	// добавьте здесь другие страны и коды
]

export const Grade = () => {
	const card = useSelector(ratedСard)
	const { _id } = card
	const [countryCode, setCountryCode] = useState('')
	const [phone, setPhone] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [price, setPrice] = useState('')

	const handleCountryCodeChange = event => {
		setCountryCode(event.target.value)
	}
	const handlePriceChange = event => {
		setPrice(event.target.value)
	}

	const handlePhoneChange = event => {
		const phoneNumber = event.target.value
		setPhone(phoneNumber)
		if (!phoneNumber.match(phoneRegex)) {
			setPhoneError('Numara biçimi: 10 hane')
		} else {
			setPhoneError('')
		}
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (phoneError === '') {
			// submit phone number, id, and price to server
			try {
				const buyerTel = countryCode + phone

				const updatedCard = { ...card, grade: price, tel: buyerTel }
				const { category } = updatedCard
				if (category === 'monitor') {
					await axios.patch(`/monitors/${_id}`, updatedCard)
				} else if (category === 'computer') {
					await axios.patch(`/posts/${_id}`, updatedCard)
				} else if (category === 'accessories') {
					await axios.patch(`/accessories/${_id}`, updatedCard)
				} else if (category === 'laptop') {
					await axios.patch(`/laptops/${_id}`, updatedCard)
				}

				alert('Teklifiniz gönderildi')
				setPhone('')
				setCountryCode('')
				setPhoneError('')
			} catch (error) {
				alert('Gönderilemedi 😔')
			}
		}
	}

	return (
		<div className={`${styles.wrapper} `}>
			<Paper classes={{ root: styles.root }}>
				<form onSubmit={handleSubmit}>
					<Typography classes={{ root: styles.title }} variant='h5'>
						ID'si olan ürüne fiyat veriyorsunuz:
					</Typography>
					<TextField
						className={styles.field}
						label='ID'
						type='text'
						fullWidth
						readOnly
						defaultValue={_id}
					/>
					<TextField
						className={styles.field}
						label='Fiyatınız'
						type='number'
						fullWidth
						required
						onChange={handlePriceChange}
					/>
					<div>
						<label>Ülke Kodu</label>
						<select
							className={styles.field}
							value={countryCode}
							onChange={handleCountryCodeChange}
							required
						>
							<option value=''>Ülke kodunu seçin</option>
							{countries.map(country => (
								<option key={country.code} value={country.code}>
									{`${country.name} (${country.code})`}
								</option>
							))}
						</select>
					</div>
					<TextField
						className={styles.field}
						label='Telefon Numarası'
						type='text'
						fullWidth
						required
						error={!!phoneError}
						helperText={phoneError}
						value={phone}
						onChange={handlePhoneChange}
					/>
					<Button type='submit' size='large' variant='contained' fullWidth>
						Fiyatı Gönder
					</Button>
				</form>
			</Paper>
		</div>
	)
}
