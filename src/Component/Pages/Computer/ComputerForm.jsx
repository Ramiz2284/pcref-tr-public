import styles from '../Form.module.sass'

import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../Redux/axios'

import Loader from '../../Loader'
import { selectIsAuth } from '../../Redux/LoginSlice'
import Popap from '../Popap/Popap'

function ComputerForm() {
	const imgRef = useRef(null)
	const [btnOn, setBtnOn] = useState(false)
	const [addImg, setAddImg] = useState('')
	const [activated, setActivated] = useState('')
	const [submitOn, setSubmitON] = useState(true)
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
			brand: '',
			model: '',
			processor: '',
			memory: '',
			storage: '',
			price: '',
			description: '',
			grade: '0',
			tel: '0',
			image: '',
			category: 'computer',
		},
		validate: values => {
			let errors = {}

			if (!values.processor) {
				errors.processor = 'Zorunlu alan'
			}
			if (!values.memory) {
				errors.memory = 'Zorunlu alan'
			}
			if (!values.storage) {
				errors.storage = 'Zorunlu alan'
			}
			if (!values.price) {
				errors.price = 'Zorunlu alan'
			}

			return errors
		},

		onSubmit: async values => {
			if (submitOn === true) {
				try {
					values.image = addImg

					const { data } = await axios.post('/posts', values)
					console.log(data._id)
					alert('Form gönderildi ve değerlendirme bekliyor')
					formik.resetForm()
				} catch (error) {
					console.warn(error)
					alert(
						'Form doldurma hatası!!! Sayfayı yeniden yüklemek için OK tuşuna basın'
					)
					formik.resetForm()
				}
				setSubmitON(false)
			} else {
				console.log('Fotoğraf yüklüyoruz')
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

				console.log('fotoğraf yüklendi')
				setAddImg(res.data.url)
				setBtnOn(false)
				setSubmitON(true)
			} catch (error) {
				console.warn(error)
				alert('Hata!!! Dosya çok büyük olabilir')
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
		<>
			{activated ? null : <Popap />}
			<form
				className={`${styles.computerForm} ${'shadow'}`}
				onSubmit={formik.handleSubmit}
			>
				<label>
					<div>Marka:</div>
					<input
						type='text'
						name='brand'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.brand}
						placeholder='Eğer toplamanız varsa boş bırakın!'
					/>
					{formik.errors.brand && formik.touched.brand ? (
						<div className={styles.eror}>{formik.errors.brand}</div>
					) : null}
				</label>
				<label>
					<div>Model:</div>
					<input
						type='text'
						name='model'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.model}
						placeholder='Eğer toplamanız varsa boş bırakın!'
					/>
					{formik.errors.model && formik.touched.model ? (
						<div className={styles.eror}>{formik.errors.model}</div>
					) : null}
				</label>
				<label>
					<div>İşlemci:</div>
					<input
						type='text'
						name='processor'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.processor}
						placeholder='Örnek: i7 8700'
					/>
					{formik.errors.processor && formik.touched.processor ? (
						<div className={styles.eror}>{formik.errors.processor}</div>
					) : null}
				</label>
				<label>
					<div>Bellek:</div>
					<span>Bellek kapasitesi.</span>
					<input
						type='text'
						name='memory'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.memory}
						placeholder='Örnek: 6 gb'
					/>
					{formik.errors.memory && formik.touched.memory ? (
						<div className={styles.eror}>{formik.errors.memory}</div>
					) : null}
				</label>
				<label>
					<div>Depolama:</div>
					<span>Ana bellek kapasitesi.</span>
					<input
						type='text'
						name='storage'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.storage}
						placeholder='Örnek: 500 gb'
					/>
					{formik.errors.storage && formik.touched.storage ? (
						<div className={styles.eror}>{formik.errors.storage}</div>
					) : null}
				</label>
				<label>
					<div>Fiyat:</div>
					<span>
						Almak istediğiniz fiyatı buraya yazmanız gerekiyor. <br /> Lütfen
						gerçek fiyat yazın.
					</span>
					<input
						type='text'
						name='price'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.price}
						placeholder='Sadece fiyatı yazın'
					/>
					{formik.errors.price && formik.touched.price ? (
						<div className={styles.eror}>{formik.errors.price}</div>
					) : null}
				</label>
				<label>
					<div>Açıklama:</div>
					<span>Burada herhangi bir metin yazabilirsiniz.</span>
					<textarea
						type='text'
						name='description'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						placeholder='Lütfen özellikleri mümkün olduğunca detaylı bir şekilde açıklayın, bu iyi bir fiyat almanıza yardımcı olacaktır!'
					/>
				</label>
				<label>
					<div>Görsel:</div>
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
							Fotoğraf Ekle
						</button>
					) : null}
				</label>

				{!btnOn ? (
					<button type='submit'>Değerlendirme için gönder</button>
				) : null}
			</form>
		</>
	)
}

export default ComputerForm
