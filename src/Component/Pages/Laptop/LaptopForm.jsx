import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../Loader'
import { selectIsAuth } from '../../Redux/LoginSlice'
import axios from '../../Redux/axios'
import styles from '../Form.module.sass'
import Popap from '../Popap/Popap'

function LaptopsForm() {
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
			processor: '',
			storage: '',
			ram: '',
			price: '',
			description: '',
			grade: '0',
			tel: '0',
			category: 'laptop',
			image: '',
		},
		validate: values => {
			let errors = {}

			if (!values.model) {
				errors.model =
					'Ürününüzün modelini gösteren bir etiket genellikle gövdede bulunur.'
			}

			if (!values.processor) {
				errors.processor = 'Zorunlu alan'
			}
			if (!values.storage) {
				errors.storage = 'Zorunlu alan'
			}
			if (!values.price) {
				errors.price = 'Zorunlu alan'
			}
			if (!values.size) {
				errors.size = 'Zorunlu alan'
			}
			if (!values.ram) {
				errors.ram = 'Zorunlu alan'
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

					const { data } = await axios.post('/laptops', values)
					console.log(data._id)
					alert('Form gönderildi ve değerlendirme bekliyor')
					formik.resetForm()
				} catch (error) {
					console.warn(error)
					alert(
						"Form doldurma hatası!!! Sayfayı yeniden yüklemek için OK'a basın"
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
				console.log('Foto yüklendi ')

				setAddImg(res.data.url)
				setBtnOn(false)
			} catch (error) {
				console.warn(error)
				alert('Hata!!! Dosya belki de çok büyük')
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
						placeholder='Örnek: Asus ROG Strix G531GT-BQ091'
					/>
					{formik.errors.model && formik.touched.model ? (
						<div className={styles.eror}>{formik.errors.model}</div>
					) : null}
				</label>
				<label>
					<div>Ekran boyutu:</div>
					<input
						type='text'
						name='size'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.size}
						placeholder='Örnek: 15.6'
					/>
					{formik.errors.size && formik.touched.size ? (
						<div className={styles.eror}>{formik.errors.size}</div>
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
						placeholder='Örnek: Core i5 9300H'
					/>
					{formik.errors.processor && formik.touched.processor ? (
						<div className={styles.eror}>{formik.errors.processor}</div>
					) : null}
				</label>
				<label>
					<div>Ram:</div>
					<input
						type='text'
						name='ram'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.ram}
						placeholder='Örnek: 8GB'
					/>
					{formik.errors.ram && formik.touched.ram ? (
						<div className={styles.eror}>{formik.errors.ram}</div>
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
						placeholder='Örnek: ssd 500gb'
					/>
					{formik.errors.storage && formik.touched.storage ? (
						<div className={styles.eror}>{formik.errors.storage}</div>
					) : null}
				</label>
				<label>
					<div>Fiyat: </div>
					<span>
						Burada almak istediğiniz fiyatı belirtin. <br /> Lütfen gerçekçi bir
						fiyat yazın.
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
						placeholder='Özellikleri olabildiğince detaylı bir şekilde açıklayın, bu iyi bir fiyat almanıza yardımcı olacaktır!'
					/>
				</label>
				<label>
					<div>Resim:</div>
					<span>Maksimum dosya boyutu 2 MB</span>
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
							Foto ekle
						</button>
					) : null}
				</label>
				{!btnOn ? <button type='submit'>Değerlendirmeye gönder</button> : null}
			</form>
		</>
	)
}

export default LaptopsForm
