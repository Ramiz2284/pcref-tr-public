import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.sass";
import { fetchRegister, selectIsRegister } from "../../Redux/RegSlice";

export const Registrations = () => {

  const isRegister = useSelector(selectIsRegister);
  const dispathc = useDispatch();

  const { register, handleSubmit, /* setError */ formState: { errors, /* isValid */ } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange'
  });

  const onSubmit = (values) => {
    dispathc(fetchRegister(values));
  };

  if (isRegister) {
    return <Navigate to="/login" />;
  }


  return (
    <div className={`${styles.wrapper} `}>
      <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Регистрация
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
          <TextField
            className={styles.field}
            label="Имя"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: "Укажите имя" })}
            type='text'
            fullWidth
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Зарегестрироваться
          </Button>
        </form>
        <p className={styles.privacy}>Регистрируясь вы соглашаетесь с политикой конфиденциальности.</p>
      </Paper>
    </div>
  );
};
