import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../Loader'
import { selectIsAuth } from '../../Redux/LoginSlice'
import axios from '../../Redux/axios'
import styles from '../Form.module.sass'
import Popap from '../Popap/Popap'

function MonitorForm() {
	const imgRef = useRef(null)
	const [btnOn, setBtnOn] = useState(false)
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
			model: '',
			size: '',
			screenresolution: '',
			update: '',
			price: '',
			description: '',
			image: '',
			grade: '0',
			tel: '',
			category: 'monitor',
		},
		validate: values => {
			let errors = {}

			if (!values.model) {
				errors.model = 'Ürününüzün modeli genellikle gövdede yazılıdır.'
			}

			if (!values.screenresolution) {
				errors.screenresolution = 'Zorunlu alan'
			}
			if (!values.update) {
				errors.update = 'Zorunlu alan'
			}
			if (!values.price) {
				errors.price = 'Zorunlu alan'
			}
			if (!values.size) {
				errors.size = 'Zorunlu alan'
			}

			return errors
		},

		onSubmit: async values => {
			if (btnOn === true) {
				console.log('Uploading photos to the server')
				setBtnOn(false)
			} else {
				try {
					values.image = addImg

					const { data } = await axios.post('/monitors', values)
					console.log(data._id)
					alert('Form gönderildi ve değerlendirilmeyi bekliyor')
					formik.resetForm()
				} catch (error) {
					console.warn(error)
					alert(
						'Form doldurma hatası!!! Sayfayı yeniden yüklemek için OK tuşuna basın'
					)
					formik.resetForm()
				}
			}
		},
	})

	const uploadImg = async event => {
		if (event.target.files[0] === undefined) {
			console.log('File added')
			setBtnOn(true)
		} else {
			try {
				setLoading(true)
				event.preventDefault()

				const formData = new FormData()

				for (let i = 0; i < event.target.files.length; i++) {
					formData.append('image', event.target.files[i])
				}

				const res = await axios.post('/upload', formData)
				setAddImg(res.data.url)
				setBtnOn(false)
			} catch (error) {
				console.warn(error)
				alert('Hata!!! Muhtemelen dosya çok büyük')
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
			<form
				className={`${styles.computerForm} ${'shadow'}`}
				onSubmit={formik.handleSubmit}
			>
				{activated ? null : <Popap />}

				<label>
					<div>Model:</div>
					<input
						type='text'
						name='model'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.model}
						placeholder='Örnek: Samsung M5 LS27BM500EUXUF'
					/>
					{formik.errors.model && formik.touched.model ? (
						<div className={styles.eror}>{formik.errors.model}</div>
					) : null}
				</label>
				<label>
					<div>Ekran Boyutu:</div>
					<input
						type='text'
						name='size'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.size}
						placeholder='Örnek: 27'
					/>
					{formik.errors.size && formik.touched.size ? (
						<div className={styles.eror}>{formik.errors.size}</div>
					) : null}
				</label>
				<label>
					<div>Ekran Çözünürlüğü:</div>
					<input
						type='text'
						name='screenresolution'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.screenresolution}
						placeholder='Örnek: 1920 x 1080'
					/>
					{formik.errors.screenresolution && formik.touched.screenresolution ? (
						<div className={styles.eror}>{formik.errors.screenresolution}</div>
					) : null}
				</label>
				<label>
					<div>Yenileme Hızı:</div>
					<input
						type='text'
						name='update'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.update}
						placeholder='Örnek: 60 Hz'
					/>
					{formik.errors.update && formik.touched.update ? (
						<div className={styles.eror}>{formik.errors.update}</div>
					) : null}
				</label>
				<label>
					<div>Fiyat: </div>
					<span>
						Buraya almak istediğiniz fiyatı belirtmelisiniz. <br /> Lütfen
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
					<div>Açıklama: </div>
					<span>Burada herhangi bir metin belirtebilirsiniz</span>
					<textarea
						type='text'
						name='description'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						placeholder='Özellikleri mümkün olduğunca detaylı olarak açıklayın, bu iyi bir fiyat almanıza yardımcı olacaktır!'
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
							Foto Ekle
						</button>
					) : null}
				</label>
				{!btnOn ? <button type='submit'>Değerlendirmeye Gönder</button> : null}
			</form>
		</>
	)
}

export default MonitorForm
