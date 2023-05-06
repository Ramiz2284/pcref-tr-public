import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, selectIsAuth } from '../../Component/Redux/LoginSlice'

import GoogleTranslate from '../Pages/GoogleTranslate'
import styles from './Header.module.sass'

function Header() {
	const [name, setName] = useState()
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	useEffect(() => {
		if (isAuth) {
			const { fullName } = isAuth
			setName(fullName)
		}
	}, [isAuth])

	const logoutFN = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
	}
	const menuRef = useRef(null)
	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuRef])

	return (
		<>
			<div className={styles.header}>
				<div className={styles.logo}>
					<Link className={styles.link} to='/'>
						<li>Скупка компьютеров</li>
					</Link>
				</div>

				<div
					onClick={() => setIsOpen(!isOpen)}
					className={`${styles.burger} ${isOpen ? styles.burgerClose : ''}`}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
					<ul ref={menuRef}>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/computer'
						>
							<li>Компьютер</li>
						</Link>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/accessories'
						>
							<li>Комплектующие</li>
						</Link>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/monitors'
						>
							<li>Мониторы</li>
						</Link>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/laptops'
						>
							<li>Ноутбуки</li>
						</Link>
					</ul>
				</nav>

				{!isAuth ? (
					<div className={styles.registerWrap}>
						<Link className={styles.link} to='/login'>
							<div className={styles.login}>Войти</div>
						</Link>
						<Link className={styles.link} to='/registrations'>
							<div className={styles.register}>Регистрация</div>
						</Link>
					</div>
				) : (
					<div className={styles.logout}>
						<div onClick={logoutFN} className={styles.login}>
							Выйти
						</div>
						<div className={styles.isLogin}>
							Вы вошли как: <br />{' '}
							<span style={{ color: '#1770af' }}>{name}</span>
						</div>
					</div>
				)}
				<GoogleTranslate />
			</div>
		</>
	)
}

export default Header
