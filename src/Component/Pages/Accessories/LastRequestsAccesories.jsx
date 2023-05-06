

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../Redux/axios';
import { submitPrice } from '../../Redux/EstimateSlice';
import { useSelector } from "react-redux";
import { selectIsAuth } from '../../Redux/LoginSlice';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LastRequestsAccesories() {
    const [data, setData] = useState([]);
    const [photoBig, setPhotoBig] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [trashOn, setTrashOn] = useState(false);

    const dispathc = useDispatch();

    const isAuth = useSelector(selectIsAuth);
    useEffect(() => {
        if (isAuth) {
            const { email } = isAuth;
            if (email === "tehnoshark2284@gmail.com") {
                setTrashOn(true);
            }
        }
    }, [isAuth]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/accessories');

            setData(result.data);
        };
        fetchData();
    }, []);

    const searchFilter = (searchQuery, item) => {
        return Object.values(item).some(value => {
            return (typeof value === 'string' || value instanceof String) && value.toLowerCase().includes(searchQuery.toLowerCase().trim())
        });
    }

    useEffect(() => {
        const filtered = data.filter(item => searchFilter(searchQuery, item))
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const photo = (item) => {
        if (photoBig === item) {
            setPhotoBig(null);
        } else {
            setPhotoBig(item);
        }
    }

    const Grade = (card) => {
        dispathc(submitPrice(card));
    };
    const Trash = async (item) => {
        await axios.delete(`/accessories/${item._id}`);
    };



    return (
        <div className='last-requests'>
            <input type="text" placeholder="Search" onChange={e => setSearchQuery((e.target.value).toString())} />
            <h2>Тут все ценовые запросы, которые делали люди до вас.</h2>
            <p>Воспльзуйтесь поиском что бы найти похожее.</p>
            <div className="last-requests-wrap">
                {filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item) => (
                    <div key={item._id} className="lastRequestCardsWrap">
                        <ul>
                            {trashOn ? <button onClick={() => Trash(item)} className='cartTrash'><FontAwesomeIcon icon={faTrash} /></button> : null}
                            <li className='imgLi' >
                                {item.image.map((item, index) => (
                                    <img
                                        key={index}
                                        className={photoBig === item ? 'big' : ''}
                                        onClick={() => photo(item)}
                                        src={item ? `https://pcref.site:9000${item}` : `https://pcref.site:9000/uploads/hqdefault.jpg`}
                                        alt=""
                                    />
                                ))}
                            </li>
                            <li >
                                <p>{item.category}</p>
                            </li>
                            <li >
                                <p>Date:</p>
                                <p className='date'>{item.createdAt}</p>
                            </li>
                            <li >
                                <p>Video card:</p>
                                <p>{item.video}</p>
                            </li>
                            <li >
                                <p>Motherboard:</p>
                                <p>{item.motherboard}</p>
                            </li>
                            <li >
                                <p>Processor:</p>
                                <p>{item.processor}</p>
                            </li>
                            <li >
                                <p>Memory:</p>
                                <p>{item.memory}</p>
                            </li>
                            <li >
                                <p>SSD HDD:</p>
                                <p>{item.storage}</p>
                            </li>
                            <li >
                                <p>Power (Блок питания):</p>
                                <p>{item.power}</p>
                            </li>
                            <li >
                                <p>PC case (Корпус ПК):</p>
                                <p>{item.case}</p>
                            </li>
                            <li >
                                <p>Price:</p>
                                <p>{item.price}</p>
                            </li>
                            <li >
                                <p>Цена от скупщика:</p>
                                <p>{item.grade}</p>
                            </li>
                            <li className='description' >
                                <p>Description:</p>
                                <p>{item.description}</p>
                            </li>
                            <li >
                                <p>ID товара:</p>
                                <p>{item._id}</p>
                            </li>
                            <Link className='Link' to='/grade'><button className='estimate' onClick={() => Grade(item)}>Оценить</button></Link>

                        </ul>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default LastRequestsAccesories;