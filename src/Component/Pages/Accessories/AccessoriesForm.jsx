import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from '../../Redux/axios';
import { selectIsAuth } from '../../Redux/LoginSlice';
import Popap from '../Popap/Popap';

import styles from "../Form.module.sass";
import Loader from '../../Loader';

function AccessoriesForm() {

    const imgRef = useRef(null);
    const [btnOn, setBtnOn] = useState(false);
    const [submitOn, setSubmitON] = useState(true);
    const [addImg, setAddImg] = useState('');
    const [activated, setActivated] = useState('');
    const [loading, setLoading] = useState(false);

    const isAuth = useSelector(selectIsAuth);
    useEffect(() => {
        if (isAuth) {
            const { isActivated } = isAuth;
            setActivated(isActivated);
        }
    }, [isAuth]);


    const formik = useFormik({
        initialValues: {
            video: '',
            motherboard: '',
            processor: '',
            memory: '',
            storage: '',
            price: '',
            power: '',
            case: '',
            description: '',
            grade: '0',
            tel: '0',
            category: 'accessories',
            image: '',


        },
        validate: (values) => {
            let errors = {};
            if (!values.video) {
                errors.video = 'Нет видеокарты? Напишите "нет"';
            }
            if (!values.motherboard) {
                errors.motherboard = 'Нет матплаты? Напишите "нет"';
            }
            if (!values.processor) {
                errors.processor = 'Нет процессора? Напишите "нет"';
            }
            if (!values.memory) {
                errors.memory = 'Нет оперативки? Напишите "нет"';
            }
            if (!values.storage) {
                errors.storage = 'Нет HDD или SDD? Напишите "нет"';
            }
            if (!values.price) {
                errors.price = 'Обязательное поле';
            }
            if (!values.power) {
                errors.power = 'Нет блок питания? Напишите "нет"';
            }
            if (!values.case) {
                errors.case = 'Нет корпуса? Напишите "нет"';
            }


            return errors;
        },



        onSubmit: async (values) => {

            if (submitOn === true) {
                try {

                    values.image = addImg;

                    const { data } = await axios.post('/accessories', values);
                    console.log(data._id);
                    alert('Форма отправлена и ожидает оценки');
                    formik.resetForm();
                } catch (error) {
                    console.warn(error);
                    alert('Oшибка заполнения формы!!! Что бы перезагрузить страницу нажмите OK');
                    formik.resetForm();
                }
                setSubmitON(false);

            } else {

                console.log('Загружаем фото');
            }


        }
    });


    const uploadImg = async (event) => {

        if (event.target.files[0] === undefined) {
            console.log('File added');
            setBtnOn(true);
            setSubmitON(false);
        } else {
            try {
                setLoading(true);
                event.preventDefault();

                const formData = new FormData();
                for (let i = 0; i < event.target.files.length; i++) {
                    formData.append('image', event.target.files[i]);
                }

                const res = await axios.post('/upload', formData);

                console.log('фото загружено');
                setAddImg(res.data.url);
                setBtnOn(false);
                setSubmitON(true);
            } catch (error) {
                console.warn(error);
                alert('Ошибка!!! Возможно фаил слишком большой');
                formik.setValues({ ...formik.values, image: '' });
            } finally {
                setLoading(false);
            }


        }
    };

    const uploadImgBtn = () => {
        imgRef.current.click();
    }

    return (
        <form className={`${styles.computerForm} ${"shadow"}`} onSubmit={formik.handleSubmit}>
            {activated ? null : <Popap />}
            <label>
                <div>Video card:</div>
                <input
                    type="text"
                    name="video"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.video}
                    placeholder="Пишите модель или нету! Пример: rtx 2080"
                />
                {formik.errors.video && formik.touched.video ? <div className={styles.eror} >{formik.errors.video}</div> : null}
            </label>
            <label>
                <div>Motherboard:</div>
                <input
                    type="text"
                    name="motherboard"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.motherboard}
                    placeholder="Пишите модель или нету! Пример: h110-mk"
                />
                {formik.errors.motherboard && formik.touched.motherboard ? <div className={styles.eror}>{formik.errors.motherboard}</div> : null}
            </label>
            <label>
                <div>Processor:</div>
                <input
                    type="text"
                    name="processor"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.processor}
                    placeholder="Пишите модель или нету! Пример: i7 8700"
                />
                {formik.errors.processor && formik.touched.processor ? <div className={styles.eror}>{formik.errors.processor}</div> : null}
            </label>
            <label>
                <div>Memory:</div>
                <input
                    type="text"
                    name="memory"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.memory}
                    placeholder="Пишите модель или нету! Пример: 6 gb"
                />
                {formik.errors.memory && formik.touched.memory ? <div className={styles.eror}>{formik.errors.memory}</div> : null}
            </label>
            <label>
                <div>SSD HDD:</div>
                <input
                    type="text"
                    name="storage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.storage}
                    placeholder="Пишите модель или нету! Пример: 500 gb"
                />
                {formik.errors.storage && formik.touched.storage ? <div className={styles.eror}>{formik.errors.storage}</div> : null}
            </label>
            <label>
                <div>Power (Блок питания):</div>
                <input
                    type="text"
                    name="power"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.power}
                    placeholder="Пишите модель или нету!"
                />
                {formik.errors.power && formik.touched.power ? <div className={styles.eror}>{formik.errors.power}</div> : null}
            </label>
            <label>
                <div>PC case (Корпус ПК):</div>
                <input
                    type="text"
                    name="case"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.case}
                    placeholder="Пишите модель или нету или нонэйм!"
                />
                {formik.errors.case && formik.touched.case ? <div className={styles.eror}>{formik.errors.case}</div> : null}
            </label>
            <label>
                <div>Price: </div>
                <span>Тут надо указать цену которую хотите получить. <br /> Пожалуйста пишите реальную цену.</span>
                <input
                    type="text"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    placeholder="Тут просто цену"
                />
                {formik.errors.price && formik.touched.price ? <div className={styles.eror}>{formik.errors.price}</div> : null}
            </label>
            <label>
                <div>Description: </div>
                <span>Здесь можно указать любой текст</span>
                <textarea
                    type="text"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    placeholder="Опишите товар максимально точно, это поможет получить хорошую цену!"
                />
                {formik.errors.description && formik.touched.description ? <div className={styles.eror}> {formik.errors.description}</div> : null}
            </label>
            <label>
                <div>Image:</div>
                <span>Максимальный размер файла 2 mb</span>
                {loading ? <Loader /> : null}
                <input
                    multiple
                    ref={imgRef}
                    type="file"
                    name="image"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.image}
                    onClick={(event => uploadImg(event))}

                />

                {btnOn ? <button type="button" onClick={uploadImgBtn} >Прикрепить фото</button> : null}

            </label>
            {!btnOn ? <button type="submit">Отправить на оценку</button> : null}
        </form>
    );
}

export default AccessoriesForm;
