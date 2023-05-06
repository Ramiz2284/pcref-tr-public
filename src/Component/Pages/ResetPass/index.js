import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';

import styles from "./Login.module.sass";
import axios from '../../Redux/axios';

export const ResetPass = () => {
  const [error, setError] = useState(null);


  const { register, handleSubmit, /* setError */ formState: { errors, /* isValid */ } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.patch('/auth/resetpass', values);
      setError(res.data.message);

    } catch (error) {
      setError(error.response.data.message);
    }

  };




  return (
    <div className={`${styles.wrapper} `}>
      <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Укажите email и новый пароль
          </Typography>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: "Укажите почту" })}
            type='email'
            fullWidth
          />

          <TextField
            className={styles.field}
            label="Пароль"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: "Укажите пароль" })}
            type='password'
            fullWidth
          />
          {error && <p className={styles.resetError}> {error}</p>}
          <Button
            type="submit" size="large" variant="contained" fullWidth>
            Изменить пароль
          </Button>
        </form>

      </Paper>
    </div>
  );
};
