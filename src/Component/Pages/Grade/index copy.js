import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

import styles from "./Grade.module.sass";
import { ratedСard } from "../../Redux/EstimateSlice";
import axios from "../../Redux/axios";

const phoneNumberRegex = /^7[0-9]{10}$/;


export const Grade = () => {
  const card = useSelector(ratedСard);
  const { _id } = card;
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    setPhone(phoneNumber);
    if (!phoneNumber.match(phoneNumberRegex)) {
      setPhoneError('Формат номера 7XXXXXXXXXX');
    } else {
      setPhoneError('');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phoneError === '') {
      //submit phone number, id, and price to server
      try {
        const buyerPprice = event.target[4].value;
        const buyerTel = event.target[2].value;

        const updatedCard = { ...card, grade: buyerPprice, tel: buyerTel };
        const { category } = updatedCard;
        if (category === 'monitor') {
          await axios.patch(`/monitors/${_id}`, updatedCard);
        } else if (category === 'computer') {
          await axios.patch(`/posts/${_id}`, updatedCard);
        } else if (category === 'accessories') {
          await axios.patch(`/accessories/${_id}`, updatedCard);
        } else if (category === 'laptop') {
          await axios.patch(`/laptops/${_id}`, updatedCard);
        }

        alert('Ваше предложение отправлено');
        setPhone('');
        setPhoneError('');
      } catch (error) {
        alert('Не удалось отправить 😔');
      }

    }
  };


  return (
    <div className={`${styles.wrapper} `}>
      <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Вы даете цену на товар с ID:
          </Typography>
          <TextField
            className={styles.field}
            label="ID"
            type='text'
            fullWidth
            readOnly
            defaultValue={_id}
          />
          <TextField
            className={styles.field}
            label="Номер телефона"
            type='text'
            fullWidth
            required
            error={!!phoneError}
            helperText={phoneError}
            value={phone}
            onChange={handlePhoneChange}
          />
          <TextField
            className={styles.field}
            label="Ваша цена"
            type='number'
            fullWidth
            required
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Отправить цену
          </Button>
        </form>

      </Paper>
    </div>
  );
};
