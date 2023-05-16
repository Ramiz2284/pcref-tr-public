import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { fetchRegister, selectIsRegister } from '../../Redux/RegSlice'
import styles from './Login.module.sass'

export const Registrations = () => {
	const isRegister = useSelector(selectIsRegister)
	const dispathc = useDispatch()

	const {
		register,
		handleSubmit,
		/* setError */ formState: { errors /* isValid */ },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			fullName: '',
		},
		mode: 'onChange',
	})

	const onSubmit = values => {
		dispathc(fetchRegister(values))
	}

	if (isRegister) {
		return <Navigate to='/login' />
	}

	return (
		<div className={`${styles.wrapper} `}>
			<Paper classes={{ root: styles.root }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography classes={{ root: styles.title }} variant='h5'>
						Kayıt Ol
					</Typography>
					<TextField
						className={styles.field}
						label='E-Mail'
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						{...register('email', { required: 'E-posta girin' })}
						type='email'
						fullWidth
					/>
					<TextField
						className={styles.field}
						label='Şifre'
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						{...register('password', { required: 'Şifre girin' })}
						type='password'
						fullWidth
					/>
					<TextField
						className={styles.field}
						label='İsim'
						error={Boolean(errors.fullName?.message)}
						helperText={errors.fullName?.message}
						{...register('fullName', { required: 'İsim girin' })}
						type='text'
						fullWidth
					/>
					<Button type='submit' size='large' variant='contained' fullWidth>
						Kaydol
					</Button>
				</form>
				<p className={styles.privacy}>
					Kayıt olarak gizlilik politikasıyla anlaşmış sayılırsınız.
				</p>
			</Paper>
		</div>
	)
}
