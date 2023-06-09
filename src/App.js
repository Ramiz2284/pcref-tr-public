

import { Route, Routes } from 'react-router-dom';


import './App.sass';
import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import Accessories from './Component/Pages/Accessories/Accessories';
import Computer from './Component/Pages/Computer/Computer';
import Home from './Component/Pages/Home/Home';
import LastRequests from './Component/Pages/Computer/LastRequests';
import LastRequestsAccesories from './Component/Pages/Accessories/LastRequestsAccesories';
import { Login } from './Component/Pages/Login';
import { Registrations } from './Component/Pages/Registrations';

import { useDispatch, /* useSelector */ } from "react-redux";
import { fetchAuthMe, /* selectIsAuth */ } from './Component/Redux/LoginSlice';
import React from 'react';
import Monitor from './Component/Pages/Monitor/Monitor';
import LastRequestsMonitor from './Component/Pages/Monitor/LastRequests';
import Laptops from './Component/Pages/Laptop/Laptops';
import LastRequestsLaptop from './Component/Pages/Laptop/LastRequests';
import { Grade } from './Component/Pages/Grade';
import { ResetPass } from './Component/Pages/ResetPass';
import Politica from './Politica';



function App() {
  // const isAuth = useSelector(selectIsAuth);

  const dispathc = useDispatch();

  React.useEffect(() => {
    dispathc(fetchAuthMe());
  }, [dispathc]);



  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/computer' element={<Computer />} />
        <Route path='/lastrequests' element={<LastRequests />} />
        <Route path='/accessories' element={<Accessories />} />
        <Route path='/lastrequestsacess' element={<LastRequestsAccesories />} />
        <Route path='/monitors' element={<Monitor />} />
        <Route path='/lastrequestsmonitors' element={<LastRequestsMonitor />} />
        <Route path='/laptops' element={<Laptops />} />
        <Route path='/lastrequestslaptop' element={<LastRequestsLaptop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/activation-success' element={<Login />} />
        <Route path='/registrations' element={<Registrations />} />
        <Route path='/resetpass' element={<ResetPass />} />
        <Route path='/grade' element={<Grade />} />
        <Route path='/politica' element={<Politica />} />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;
