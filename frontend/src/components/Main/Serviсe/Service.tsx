import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom";
import {addCategory, addId, addServiceBase} from "../../../store/slice";
import '../GeneralTable.css'
import AxiosService from "../../../axios/Axios";


function Service() {
    const dispatch = useDispatch()
    // @ts-ignore
    const DataBase = useSelector(state => state.Data)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();

    const [machine_id, setMachine_id] = useState<string>('');
    const [serviceCompany, setServiceCompany] = useState<string>('');
    const [serviceView, setServiceView] = useState<string>('');

    const handleClickId = (value: any) => {
        dispatch(addId(value))
        navigate('/service/id')
    }
    useEffect(() => {
        const requestMachine = async () => {
            try {
                const Data = await AxiosService.getService();
                dispatch(addServiceBase(Data.data))
                const CategoryData = await AxiosService.getServiceCategory();
                dispatch(addCategory(CategoryData))
            } catch (error: any) {
                console.error(error.message);}}
        requestMachine ()
    }, []);
    if (Status.length) {
        return (
            <div className='machine-container'>
                <Link
                    className='Link-create'
                    to='/service/create'>
                    Создать новую запись
                </Link>
                <table className='MachineTable'>
                    <thead>
                    <tr>
                        <th>
                            <p>№ заказ-наряда:</p>
                        </th>
                        <th>
                            <p>Зав. № машины:</p>
                            <input
                                placeholder='Поиск'
                                onChange={e => setMachine_id(e.target.value)}/>
                        </th>
                        <th>
                            <p>Вид Т.О.:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setServiceView(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.serviceView?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Дата провидения Т.О.:</p>
                        </th>
                        <th>
                            <p>Наработка (м/час):</p>
                        </th>
                        <th>
                            <p>Дата заказ-наряда:</p>
                        </th>
                        <th>
                            <p>Организация проводившая Т.О.:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setServiceCompany(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.serviceCompany?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {DataBase.serviceBase?.map((item: any, index: any) => (
                        <tr
                            key={index}
                            onClick={() => {handleClickId(index)}}
                            style={(machine_id && (machine_id.slice(0, machine_id.length) !==
                            item.machine_id.machine_id.slice(0, machine_id.length)))
                            || (serviceCompany && serviceCompany !== item.service_company.name)
                            || (serviceView && serviceView !== item.service_view.name)
                                ? {display: 'none'} : {color: 'black'}}
                        >
                            <td>{item.order_number}</td>
                            <td>{item.machine_id.machine_id}</td>
                            <td>{item.service_view.name}</td>
                            <td>{item.service_date}</td>
                            <td>{item.development}</td>
                            <td>{item.order_date}</td>
                            <td>{item.service_company.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <>
                <h1>Эта страница доступна только авторизованным!!!</h1>
                {navigate('/')}
            </>
        )
    }
}


export default Service;