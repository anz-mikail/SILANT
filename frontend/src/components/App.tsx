import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import Search from "./Main/Search/Search";
import Machine from "./Main/Machine/Machine";
import MachineId from "./Main/Machine/MachineId";
import CreateMachine from "./Main/Machine/CreateMachine";
import Service from "./Main/Serviсe/Service";
import ServiceId from "./Main/Serviсe/ServiceId";
import CreateService from "./Main/Serviсe/CreateService";
import Complaint from "./Main/Complaint/Complaint";
import ComplaintId from "./Main/Complaint/ComplaintId";
import CreateComplaint from "./Main/Complaint/CreateComplaint";

import './App.css'
import "react-datepicker/dist/react-datepicker.css"


function App() {
    return (
    <>
        <Header/>
        <div className='Body'>
            <Main/>
            <Routes>
                <Route path="/" element ={<Search/>}/>
                <Route path="/machine" element ={<Machine/>}/>
                <Route path="/machine/id" element={<MachineId/>}/>
                <Route path="/machine/create" element={<CreateMachine/>}/>
                <Route path="/service" element={<Service/>}/>
                <Route path="/service/id" element={<ServiceId/>}/>
                <Route path="/service/create" element={<CreateService/>}/>
                <Route path="/complaint" element={<Complaint/>}/>
                <Route path="/complaint/id" element={<ComplaintId/>}/>
                <Route path="/complaint/create" element={<CreateComplaint/>}/>
            </Routes>
        </div>
        <Footer/>
    </>
  );
}


export default App;
