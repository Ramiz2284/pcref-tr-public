import styles from "../Form.module.sass";

import axios from '../../Redux/axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../../Redux/LoginSlice';
import Popap from '../Popap/Popap';
import Loader from "../../Loader";




function ComputerForm() {
    const imgRef = useRef(null);
    const [btnOn, setBtnOn] = useState(false);
    const [addImg, setAddImg] = useState('');
    const [activated, setActivated] = useState('');
    const [submitOn, setSubmitON] = useState(true);
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
            brand: '',
            model: '',
            processor: '',
            memory: '',
            storage: '',
            price: '',
            description: '',
            grade: '0',
            tel: '0',
            image: '',
            category: 'computer',

        },
        validate: (values) => {
            let errors = {};

            if (!values.processor) {
                errors.processor = 'Обязательное поле';
            }
            if (!values.memory) {
                errors.memory = 'Обязательное поле';
            }
            if (!values.storage) {
                errors.storage = 'Обязательное поле';
            }
            if (!values.price) {
                errors.price = 'Обязательное поле';
            }



            return errors;
        },



        onSubmit: async (values) => {

            if (submitOn === true) {
                try {

                    values.image = addImg;

                    const { data } = await axios.post('/posts', values);
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
            console.log('File added')
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
        <>
            {activated ? null : <Popap />}
            <form className={`${styles.computerForm} ${"shadow"}`} onSubmit={formik.handleSubmit}>
                <label>
                    <div>Brand:</div>
                    <input
                        type="text"
                        name="brand"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brand}
                        placeholder="Если у вас сборка оставьте пустым!"
                    />
                    {formik.errors.brand && formik.touched.brand ? <div className={styles.eror} >{formik.errors.brand}</div> : null}
                </label>
                <label>
                    <div>Model:</div>
                    <input
                        type="text"
                        name="model"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.model}
                        placeholder="Если у вас сборка оставьте пустым!"
                    />
                    {formik.errors.model && formik.touched.model ? <div className={styles.eror}>{formik.errors.model}</div> : null}
                </label>
                <label>
                    <div>Processor:</div>
                    <input
                        type="text"
                        name="processor"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.processor}
                        placeholder="Пример: i7 8700"
                    />
                    {formik.errors.processor && formik.touched.processor ? <div className={styles.eror}>{formik.errors.processor}</div> : null}
                </label>
                <label>
                    <div>Memory:</div>
                    <span>Объем оперативной памяти.</span>
                    <input
                        type="text"
                        name="memory"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.memory}
                        placeholder="Пример: 6 gb"
                    />
                    {formik.errors.memory && formik.touched.memory ? <div className={styles.eror}>{formik.errors.memory}</div> : null}
                </label>
                <label>
                    <div>Storage:</div>
                    <span>Объем основной памяти.</span>
                    <input
                        type="text"
                        name="storage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.storage}
                        placeholder="Пример: 500 gb"
                    />
                    {formik.errors.storage && formik.touched.storage ? <div className={styles.eror}>{formik.errors.storage}</div> : null}
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
                        placeholder="Опишите все характеристики максимально подробно, это поможет получить хорошую цену!"
                    />

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

        </>

    );
}

export default ComputerForm;
