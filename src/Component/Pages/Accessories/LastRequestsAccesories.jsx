import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { submitPrice } from '../../Redux/EstimateSlice'
import { selectIsAuth } from '../../Redux/LoginSlice'
import axios from '../../Redux/axios'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LastRequestsAccesories() {
	const [data, setData] = useState([])
	const [photoBig, setPhotoBig] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredData, setFilteredData] = useState([])
	const [trashOn, setTrashOn] = useState(false)

	const dispathc = useDispatch()

	const isAuth = useSelector(selectIsAuth)
	useEffect(() => {
		if (isAuth) {
			const { email } = isAuth
			if (email === 'tehnoshark2284@gmail.com') {
				setTrashOn(true)
			}
		}
	}, [isAuth])

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('/accessories')

			setData(result.data)
		}
		fetchData()
	}, [])

	const searchFilter = (searchQuery, item) => {
		return Object.values(item).some(value => {
			return (
				(typeof value === 'string' || value instanceof String) &&
				value.toLowerCase().includes(searchQuery.toLowerCase().trim())
			)
		})
	}

	useEffect(() => {
		const filtered = data.filter(item => searchFilter(searchQuery, item))
		setFilteredData(filtered)
	}, [searchQuery, data])

	const photo = item => {
		if (photoBig === item) {
			setPhotoBig(null)
		} else {
			setPhotoBig(item)
		}
	}

	const Grade = card => {
		dispathc(submitPrice(card))
	}
	const Trash = async item => {
		await axios.delete(`/accessories/${item._id}`)
	}

	return (
		<div className='last-requests'>
			<input
				type='text'
				placeholder='Arama'
				onChange={e => setSearchQuery(e.target.value.toString())}
			/>
			<h2>Burada, sizden önce yapılan tüm fiyat talepleri bulunmaktadır.</h2>
			<p>Benzer bir şey bulmak için aramayı kullanın.</p>
			<div className='last-requests-wrap'>
				{filteredData
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.map(item => (
						<div key={item._id} className='lastRequestCardsWrap'>
							<ul>
								{trashOn ? (
									<button onClick={() => Trash(item)} className='cartTrash'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								) : null}
								<li className='imgLi'>
									{item.image.map((item, index) => (
										<img
											key={index}
											className={photoBig === item ? 'big' : ''}
											onClick={() => photo(item)}
											src={
												item
													? `https://pcref.site:9000${item}`
													: `https://pcref.site:9000/uploads/hqdefault.jpg`
											}
											alt=''
										/>
									))}
								</li>
								<li>
									<p>{item.category}</p>
								</li>
								<li>
									<p>Tarih:</p>
									<p className='date'>{item.createdAt}</p>
								</li>
								<li>
									<p>Ekran Kartı:</p>
									<p>{item.video}</p>
								</li>
								<li>
									<p>Anakart:</p>
									<p>{item.motherboard}</p>
								</li>
								<li>
									<p>İşlemci:</p>
									<p>{item.processor}</p>
								</li>
								<li>
									<p>Bellek:</p>
									<p>{item.memory}</p>
								</li>
								<li>
									<p>SSD HDD:</p>
									<p>{item.storage}</p>
								</li>
								<li>
									<p>Güç Kaynağı:</p>
									<p>{item.power}</p>
								</li>
								<li>
									<p>PC Kasa:</p>
									<p>{item.case}</p>
								</li>
								<li>
									<p>Fiyat:</p>
									<p>{item.price}</p>
								</li>
								<li>
									<p>Alıcıdan fiyat:</p>
									<p>{item.grade}</p>
								</li>
								<li className='description'>
									<p>Açıklama:</p>
									<p>{item.description}</p>
								</li>
								<li>
									<p>Ürün Kimliği:</p>
									<p>{item._id}</p>
								</li>
								<Link className='Link' to='/grade'>
									<button className='estimate' onClick={() => Grade(item)}>
										Değerlendir
									</button>
								</Link>
							</ul>
						</div>
					))}
			</div>
		</div>
	)
}

export default LastRequestsAccesories
