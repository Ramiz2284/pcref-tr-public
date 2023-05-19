import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../Redux/LoginSlice'
import axios from '../../Redux/axios'
import Popap from '../Popap/Popap'

import Loader from '../../Loader'
import styles from '../Form.module.sass'

function AccessoriesForm() {
	const imgRef = useRef(null)
	const [btnOn, setBtnOn] = useState(false)
	const [submitOn, setSubmitON] = useState(true)
	const [addImg, setAddImg] = useState('')
	const [activated, setActivated] = useState('')
	const [loading, setLoading] = useState(false)

	const isAuth = useSelector(selectIsAuth)
	useEffect(() => {
		if (isAuth) {
			const { isActivated } = isAuth
			setActivated(isActivated)
		}
	}, [isAuth])

	const formik = useFormik({
		initialValues: {
			video: '',
			motherboard: '',
			processor: '',
			memory: '',
			storage: '',
			price: '',
			power: '',
			case: '',
			description: '',
			grade: '0',
			tel: '0',
			category: 'accessories',
			image: '',
		},
		validate: values => {
			let errors = {}
			if (!values.video) {
				errors.video = 'Ekran kartı yok mu? "Yok" yazınız.'
			}
			if (!values.motherboard) {
				errors.motherboard = 'Anakart yok mu? "Yok" yazınız.'
			}
			if (!values.processor) {
				errors.processor = 'İşlemci yok mu? "Yok" yazınız.'
			}
			if (!values.memory) {
				errors.memory = 'RAM yok mu? "Yok" yazınız.'
			}
			if (!values.storage) {
				errors.storage = 'HDD veya SSD yok mu? "Yok" yazınız.'
			}
			if (!values.price) {
				errors.price = 'Zorunlu alan'
			}
			if (!values.power) {
				errors.power = 'Güç kaynağı yok mu? "Yok" yazınız.'
			}
			if (!values.case) {
				errors.case = 'Kasa yok mu? "Yok" yazınız.'
			}

			return errors
		},

		onSubmit: async values => {
			if (submitOn === true) {
				try {
					values.image = addImg

					const { data } = await axios.post('/accessories', values)
					console.log(data._id)
					alert('Форма отправлена и ожидает оценки')
					formik.resetForm()
				} catch (error) {
					console.warn(error)
					alert(
						'Oшибка заполнения формы!!! Что бы перезагрузить страницу нажмите OK'
					)
					formik.resetForm()
				}
				setSubmitON(false)
			} else {
				console.log('Загружаем фото')
			}
		},
	})

	const uploadImg = async event => {
		if (event.target.files[0] === undefined) {
			console.log('File added')
			setBtnOn(true)
			setSubmitON(false)
		} else {
			try {
				setLoading(true)
				event.preventDefault()

				const formData = new FormData()
				for (let i = 0; i < event.target.files.length; i++) {
					formData.append('image', event.target.files[i])
				}

				const res = await axios.post('/upload', formData)

				console.log('фото загружено')
				setAddImg(res.data.url)
				setBtnOn(false)
				setSubmitON(true)
			} catch (error) {
				console.warn(error)
				alert('Ошибка!!! Возможно фаил слишком большой')
				formik.setValues({ ...formik.values, image: '' })
			} finally {
				setLoading(false)
			}
		}
	}

	const uploadImgBtn = () => {
		imgRef.current.click()
	}

	return (
		<form
			className={`${styles.computerForm} ${'shadow'}`}
			onSubmit={formik.handleSubmit}
		>
			{activated ? null : <Popap />}
			<label>
				<div>Video card:</div>
				<input
					type='text'
					name='video'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.video}
					placeholder='Model yazın veya yok! Örnek: rtx 2080'
				/>
				{formik.errors.video && formik.touched.video ? (
					<div className={styles.eror}>{formik.errors.video}</div>
				) : null}
			</label>
			<label>
				<div>Motherboard:</div>
				<input
					type='text'
					name='motherboard'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.motherboard}
					placeholder='Model yazın veya yok! Örnek: h110-mk'
				/>
				{formik.errors.motherboard && formik.touched.motherboard ? (
					<div className={styles.eror}>{formik.errors.motherboard}</div>
				) : null}
			</label>
			<label>
				<div>Processor:</div>
				<input
					type='text'
					name='processor'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.processor}
					placeholder='Model yazın veya yok! Örnek: i7 8700'
				/>
				{formik.errors.processor && formik.touched.processor ? (
					<div className={styles.eror}>{formik.errors.processor}</div>
				) : null}
			</label>
			<label>
				<div>Memory:</div>
				<input
					type='text'
					name='memory'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.memory}
					placeholder='Model yazın veya yok! Örnek: 6 gb'
				/>
				{formik.errors.memory && formik.touched.memory ? (
					<div className={styles.eror}>{formik.errors.memory}</div>
				) : null}
			</label>
			<label>
				<div>SSD HDD:</div>
				<input
					type='text'
					name='storage'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.storage}
					placeholder='Model yazın veya yok! Örnek: 500 gb'
				/>
				{formik.errors.storage && formik.touched.storage ? (
					<div className={styles.eror}>{formik.errors.storage}</div>
				) : null}
			</label>
			<label>
				<div>Power (Güç Kaynağı):</div>
				<input
					type='text'
					name='power'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.power}
					placeholder='Model yazın veya yok!'
				/>
				{formik.errors.power && formik.touched.power ? (
					<div className={styles.eror}>{formik.errors.power}</div>
				) : null}
			</label>
			<label>
				<div>PC case (PC Kasa):</div>
				<input
					type='text'
					name='case'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.case}
					placeholder='Model yazın veya yok veya isimsiz!'
				/>
				{formik.errors.case && formik.touched.case ? (
					<div className={styles.eror}>{formik.errors.case}</div>
				) : null}
			</label>
			<label>
				<div>Price: </div>
				<span>
					Burada almak istediğiniz fiyatı belirtmelisiniz. <br /> Lütfen
					gerçekçi bir fiyat yazın.
				</span>
				<input
					type='text'
					name='price'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.price}
					placeholder='Buraya sadece fiyatı yazın'
				/>
				{formik.errors.price && formik.touched.price ? (
					<div className={styles.eror}>{formik.errors.price}</div>
				) : null}
			</label>
			<label>
				<div>Description: </div>
				<span>Burada herhangi bir metin belirtebilirsiniz</span>
				<textarea
					type='text'
					name='description'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					placeholder='Ürünü mümkün olduğunca doğru bir şekilde tanımlayın, bu iyi bir fiyat almanıza yardımcı olacaktır!'
				/>
				{formik.errors.description && formik.touched.description ? (
					<div className={styles.eror}> {formik.errors.description}</div>
				) : null}
			</label>
			<label>
				<div>Image:</div>
				<span>Maksimum dosya boyutu 2 mb</span>
				{loading ? <Loader /> : null}
				<input
					multiple
					ref={imgRef}
					type='file'
					name='image'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.image}
					onClick={event => uploadImg(event)}
				/>

				{btnOn ? (
					<button type='button' onClick={uploadImgBtn}>
						Fotoğrafı ekle
					</button>
				) : null}
			</label>
			{!btnOn ? <button type='submit'>Değerlendirmeye gönder</button> : null}
		</form>
	)
}

export default AccessoriesForm
