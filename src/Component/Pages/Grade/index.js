import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./Grade.module.sass";
import { ratedСard } from "../../Redux/EstimateSlice";
import axios from "../../Redux/axios";

const phoneRegex = /^[0-9]{10}$/;

const countries = [
  { name: 'Россия, Казахстан', code: '7' },
  { name: 'Украина', code: '380' },
  { name: 'Турция', code: '90' },
  // добавьте здесь другие страны и коды
];

export const Grade = () => {
  const card = useSelector(ratedСard);
  const { _id } = card;
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [price, setPrice] = useState('');

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    setPhone(phoneNumber);
    if (!phoneNumber.match(phoneRegex)) {
      setPhoneError('Формат номера: 10 цифр');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phoneError === '') {
      // submit phone number, id, and price to server
      try {

        const buyerTel = countryCode + phone;

        const updatedCard = { ...card, grade: price, tel: buyerTel };
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
        setCountryCode('');
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
            label="Ваша цена"
            type='number'
            fullWidth
            required
            onChange={handlePriceChange}
          />
          <div>
            <label>Код страны</label>
            <select
              className={styles.field}
              value={countryCode}
              onChange={handleCountryCodeChange}
              required
            >
              <option value="">Выберите код страны</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {`${country.name} (${country.code})`}
                </option>
              ))}
            </select>
          </div>
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
          <Button type="submit" size="large" variant="contained" fullWidth>
            Отправить цену
          </Button>
        </form>
      </Paper>
    </div>
  );
};
