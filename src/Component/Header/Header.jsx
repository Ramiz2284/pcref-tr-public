import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, selectIsAuth } from '../../Component/Redux/LoginSlice'

import logo from '../../img/logo.png'
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
						<img src={logo} alt='logo' />
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
							<li>Bilgisayar</li>
						</Link>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/accessories'
						>
							<li>Bileşenler</li>
						</Link>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/monitors'
						>
							<li>Monitörler</li>
						</Link>
						<Link
							className={styles.link}
							onClick={() => setIsOpen(false)}
							to='/laptops'
						>
							<li>Dizüstü bilgisayarlar</li>
						</Link>
					</ul>
				</nav>

				{!isAuth ? (
					<div className={styles.registerWrap}>
						<Link className={styles.link} to='/login'>
							<div className={styles.login}>Giriş Yap</div>
						</Link>
						<Link className={styles.link} to='/registrations'>
							<div className={styles.register}>Kayıt Ol</div>
						</Link>
					</div>
				) : (
					<div className={styles.logout}>
						<div onClick={logoutFN} className={styles.login}>
							Çıkış Yap
						</div>
						<div className={styles.isLogin}>
							Giriş yaptınız: <br />{' '}
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
