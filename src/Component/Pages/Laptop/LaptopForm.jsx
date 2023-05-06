
import axios from '../../Redux/axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { selectIsAuth } from '../../Redux/LoginSlice';
import { useSelector } from 'react-redux';
import Popap from '../Popap/Popap';
import styles from "../Form.module.sass";
import Loader from '../../Loader';


function LaptopsForm() {
    const imgRef = useRef(null);
    const [btnOn, setBtnOn] = useState(false);
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
            model: '',
            size: '',
            processor: '',
            storage: '',
            ram: '',
            price: '',
            description: '',
            grade: '0',
            tel: '0',
            category: 'laptop',
            image: '',

        },
        validate: (values) => {
            let errors = {};

            if (!values.model) {
                errors.model = 'На корпусе обычно есть надпись с моделью вашего товара.';
            }

            if (!values.processor) {
                errors.processor = 'Обязательное поле';
            }
            if (!values.storage) {
                errors.storage = 'Обязательное поле';
            }
            if (!values.price) {
                errors.price = 'Обязательное поле';
            }
            if (!values.size) {
                errors.size = 'Обязательное поле';
            }
            if (!values.ram) {
                errors.ram = 'Обязательное поле';
            }


            return errors;
        },


        onSubmit: async (values) => {

            if (btnOn === true) {
                console.log('Uploading photos to the server')
                setBtnOn(false);
            } else {
                try {

                    values.image = addImg;

                    const { data } = await axios.post('/laptops', values);
                    console.log(data._id);
                    alert('Форма отправлена и ожидает оценки');
                    formik.resetForm();
                } catch (error) {
                    console.warn(error);
                    alert('Oшибка заполнения формы!!! Что бы перезагрузить страницу нажмите OK');
                    formik.resetForm();
                }
            }

        }
    });


    const uploadImg = async (event) => {

        if (event.target.files[0] === undefined) {
            console.log('File added')
            setBtnOn(true);

        } else {

            try {
                setLoading(true);
                event.preventDefault();

                const formData = new FormData();


                for (let i = 0; i < event.target.files.length; i++) {
                    formData.append('image', event.target.files[i]);
                }

                const res = await axios.post('/upload', formData);
                console.log('фото загруженно');

                setAddImg(res.data.url);
                setBtnOn(false);
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
            <form className={`${styles.computerForm} ${"shadow"}`} onSubmit={formik.handleSubmit}>
                {activated ? null : <Popap />}
                <label>
                    <div>Model:</div>
                    <input
                        type="text"
                        name="model"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.model}
                        placeholder="Пример: Asus ROG Strix G531GT-BQ091"
                    />
                    {formik.errors.model && formik.touched.model ? <div className={styles.eror}>{formik.errors.model}</div> : null}
                </label>
                <label>
                    <div>Размер экрана:</div>
                    <input
                        type="text"
                        name="size"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.size}
                        placeholder="Пример: 15.6"
                    />
                    {formik.errors.size && formik.touched.size ? <div className={styles.eror}>{formik.errors.size}</div> : null}
                </label>

                <label>
                    <div>Processor:</div>
                    <input
                        type="text"
                        name="processor"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.processor}
                        placeholder="Пример: Core i5 9300H"
                    />
                    {formik.errors.processor && formik.touched.processor ? <div className={styles.eror}>{formik.errors.processor}</div> : null}
                </label>
                <label>
                    <div>Оперативная память:</div>
                    <input
                        type="text"
                        name="ram"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ram}
                        placeholder="Пример: 8GB"
                    />
                    {formik.errors.ram && formik.touched.ram ? <div className={styles.eror}>{formik.errors.ram}</div> : null}
                </label>
                <label>
                    <div>SSD HDD:</div>
                    <input
                        type="text"
                        name="storage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.storage}
                        placeholder="Пример: ssd 500gb"
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

export default LaptopsForm;
