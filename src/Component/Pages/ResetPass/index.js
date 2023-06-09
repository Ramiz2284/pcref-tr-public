import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '../../Redux/axios'
import styles from './Login.module.sass'

export const ResetPass = () => {
	const [error, setError] = useState(null)

	const {
		register,
		handleSubmit,
		/* setError */ formState: { errors /* isValid */ },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		try {
			const res = await axios.patch('/auth/resetpass', values)
			setError(res.data.message)
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	return (
		<div className={`${styles.wrapper} `}>
			<Paper classes={{ root: styles.root }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography classes={{ root: styles.title }} variant='h5'>
						E-posta ve yeni şifre girin
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
					{error && <p className={styles.resetError}> {error}</p>}
					<Button type='submit' size='large' variant='contained' fullWidth>
						Şifreyi Değiştir
					</Button>
				</form>
			</Paper>
		</div>
	)
}
