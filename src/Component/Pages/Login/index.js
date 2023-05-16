import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import { fetchAuth, selectIsAuth } from '../../Redux/LoginSlice'
import styles from './Login.module.sass'

export const Login = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispathc = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		const data = await dispathc(fetchAuth(values))

		if (!data.payload) {
			alert('Не удалось авторизоваться')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={`${styles.wrapper} `}>
			<Paper classes={{ root: styles.root }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography classes={{ root: styles.title }} variant='h5'>
						Hesaba Giriş
					</Typography>
					<TextField
						className={styles.field}
						label='E-Mail'
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						{...register('email', { required: 'Lütfen e-posta girin' })}
						type='email'
						fullWidth
					/>
					<TextField
						className={styles.field}
						label='Şifre'
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						{...register('password', { required: 'Lütfen şifre girin' })}
						type='password'
						fullWidth
					/>
					<Button type='submit' size='large' variant='contained' fullWidth>
						Giriş Yap
					</Button>
					<Link className='link' to='/resetpass'>
						<div className={styles.resetPassword}>Şifrenizi mi unuttunuz?</div>
					</Link>
				</form>
			</Paper>
		</div>
	)
}
