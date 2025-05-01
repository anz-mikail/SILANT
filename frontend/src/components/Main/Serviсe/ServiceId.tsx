import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AxiosService from "../../../axios/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { addMachineListBase} from "../../../store/slice";


function ServiceId() {
    const dispatch = useDispatch();
    // @ts-ignore
    const MachineBase  = useSelector(state => state.Data.machineListBase)
    // @ts-ignore
    const GlobalBase = useSelector(state => state.Data.serviceBase)
    // @ts-ignore
    const Id = useSelector(state => state.Data.Id)
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.serviceBase[Id])
    // @ts-ignore
    const CategoryBase = useSelector(state => state.Data.CategoryBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();
    const [clickChange, setClickChange] = useState<boolean>(false);

    const [machine_id, setMachine_id] = useState('');
    const [service_view, setService_view] = useState('');
    const [service_date, setService_date] = useState('');
    const [development, setDevelopment] = useState('');
    const [order_number, setOrder_number] = useState('');
    const [order_date, setOrder_date] = useState('');
    const [service_company, setService_company] = useState('');

    const [serviceViewDescription, setServiceViewDescription] = useState('');
    const [serviceCompanyDescription, setServiceCompanyDescription] = useState('');

    const [validError, setValidError ] = useState<boolean>(false);
    const [developmentError, setDevelopmentError ] = useState<boolean>(false);

    const handleServiceView = (e: any) => {
        setServiceViewDescription(CategoryBase.serviceView[e.target.value]?.description)
        setService_view(CategoryBase.serviceView[e.target.value]?.id)
    }
    const handleServiceCompany = (e: any) => {
        setServiceCompanyDescription(CategoryBase.serviceCompany[e.target.value]?.description)
        setService_company(CategoryBase.serviceCompany[e.target.value]?.id)
    }

    useEffect(() => {
        setValidError(false)
        if (order_number) {
            GlobalBase?.forEach((item:any) => {
                switch (item.order_number) {
                    case(order_number):
                        setValidError(true);
                    }
                }
            )
        }
    }, [order_number]); // eslint-disable-line

    useEffect(() => {
        setDevelopmentError(false)
        if (development && (!Number(development))) {
            setDevelopmentError(true);
        }
    }, [development]); // eslint-disable-line

    useEffect(() => {
        const requestServiceList = async () => {
            try{
                const Data = await AxiosService.getMachineList();
                dispatch(addMachineListBase(Data.data))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestServiceList()
    }, []); // eslint-disable-line

    const handleClickChange = () => {
        clickChange ? setClickChange(false) : setClickChange(true);
    }
    const handleSave = async () => {
        if (!validError && !developmentError){
            try{
                AxiosService.postService({
                    'id': DataBase.order_number,
                    'machine_id': machine_id,
                    'service_view':service_view,
                    'service_date':service_date,
                    'development':development,
                    'order_number':order_number,
                    'order_date':order_date,
                    'service_company':service_company,
                })
                navigate('/service')
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }
    const handleDelete = () => {
        const ListDelete = async () => {
            try{
                AxiosService.deleteService({'id': DataBase.order_number})
                navigate('/service')
            } catch (error: any) {
                console.error(error.message);}
        }
        const conf = window.confirm('Вы уверены что хотите удалить запись?',)
        if (conf) {ListDelete()}
    }
    const DateNow = new Date();
    const handleSetService_date = (date:any) => {
        setService_date(date);
    }
    const handleSetOrder_date = (date:any) => {
        setOrder_date(date);
    }
    if (Status.length && GlobalBase.length) {
        return (
            <div className='Id-conteiner'>
                <div className="btn-block">
                    <button
                        className="change-btn"
                        onClick={handleClickChange}
                    >{!clickChange ? 'Редактировать' : 'Отмена'}</button>
                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                        style={clickChange ? {display: 'block'} : {display: 'none'}}
                    >Удалить запись
                    </button>
                </div>
                <table className={clickChange ? 'create-table' : 'create-table active'}>
                    <thead>
                    <tr>
                        <th>
                            <p className='model'>Заводской номер машины:</p>
                        </th>
                        <th>
                            <p className='model'>Вид Т.О.:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th>
                            <p className='model'>Дата провидения Т.О.:</p>
                        </th>
                        <th>
                            <p className='model'>Наработка:</p>
                        </th>
                        <th>
                            <p className='model'>№ заказ-наряда:</p>
                        </th>
                        <th>
                            <p className='model'>Дата заказ-наряда:</p>
                        </th>
                        <th>
                            <p className='model'>Сервисная компания:</p>
                            <p className='description'>Описание:</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!clickChange ?
                        <tr>
                            <td>
                                <p className='model'>{DataBase.machine_id.machine_id}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.service_view.name}</p>
                                <p className='description'>{DataBase.service_view.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.service_date}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.development}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.order_number}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.order_date}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.service_company.name}</p>
                                <p className='description'>{DataBase.service_company.description}</p>
                            </td>
                        </tr> :
                        <tr>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={(e: any) => setMachine_id(e.target.value)}>
                                        <option/>
                                        <option>{DataBase.machine_id.machine_id}</option>
                                        {MachineBase?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={item.id}>
                                                {item.machine_id}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleServiceView}>
                                        <option/>
                                        {CategoryBase.serviceView?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.service_view.name}
                                            >{item.name}
                                            </option>))}
                                    </select>
                                </p>
                                <p className='description'>{serviceViewDescription}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    <form>
                                        <DatePicker
                                            className='create-input'
                                            // @ts-ignore
                                            selected={service_date}
                                            placeholderText={DataBase.service_date}
                                            onChange={handleSetService_date}
                                            maxDate={DateNow}
                                            dateFormat="dd.MM.yyyy"
                                        />
                                    </form>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={(e) => setDevelopment(e.target.value)}
                                        defaultValue={DataBase?.development}
                                    />
                                    <p className='create-error'
                                       style={developmentError? {} : {display: 'none'}}>
                                        Введите корректные данные!!!
                                    </p>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={e => setOrder_number(e.target.value)}
                                        defaultValue={DataBase?.order_number}
                                    />
                                    <p className='create-error'
                                        style={!validError ? {display: 'none'} : {}}>
                                        Запись под таким номером уже существует!
                                    </p>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <form>
                                        <DatePicker
                                            className='create-input'
                                            // @ts-ignore
                                            selected={order_date}
                                            placeholderText={DataBase.order_date}
                                            onChange={handleSetOrder_date}
                                            maxDate={DateNow}
                                            dateFormat="dd.MM.yyyy"
                                        />
                                    </form>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleServiceCompany}>
                                        <option/>
                                        {CategoryBase.serviceCompany?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.service_company.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{serviceCompanyDescription}</p>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
                <div className="btn-block">
                    <button
                        className="save-btn"
                        onClick={handleSave}
                        style={clickChange ? {display: 'block'} : {display: 'none'}}
                    >Сохранить
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>Эта страница доступна только авторизованным!!!</h1>
                {navigate('/service')}
            </>
        )
    }
}


export default ServiceId;