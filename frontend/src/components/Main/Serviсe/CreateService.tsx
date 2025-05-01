import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker.css"
import AxiosService from "../../../axios/Axios";
import CreateModel from '../CreateModel/CreateModel'
import {addCategory, addMachineListBase} from "../../../store/slice";


function CreateService() {
    const dispatch = useDispatch()
    // @ts-ignore
    const MachineBase = useSelector(state => state.Data.machineListBase)
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.serviceBase)
    // @ts-ignore
    const CategoryBase = useSelector(state => state.Data.CategoryBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();

    const [machine_id, setMachine_id] = useState('');
    const [service_view, setService_view] = useState<number>();
    const [service_date, setService_date] = useState('');
    const [development, setDevelopment] = useState('');
    const [order_number, setOrder_number] = useState('');
    const [order_date, setOrder_date] = useState('');
    const [service_company, setService_company] = useState<number>();

    const [serviceViewDescription, setServiceViewDescription] = useState('');
    const [serviceViewName, setServiceViewName] = useState('');
    const [serviceCompanyDescription, setServiceCompanyDescription] = useState('');
    const [serviceCompanyName, setServiceCompanyName] = useState('');

    const [createError, setCreateError] = useState<boolean>(false);
    const [validName, setValidName] = useState<string>('');
    const [developmentError, setDevelopmentError ] = useState<boolean>(false);

    const [click, setClick] = useState(false);
    const handleClick = () => {
        click? setClick(false): setClick(true)
    }

    const handleServiceView = (e: any) => {
        setServiceViewDescription(CategoryBase.serviceView[e.target.value]?.description)
        setServiceViewName(CategoryBase.serviceView[e.target.value]?.name)
        setService_view(CategoryBase.serviceView[e.target.value]?.id)
    }
    const handleServiceCompany = (e: any) => {
        setServiceCompanyDescription(CategoryBase.serviceCompany[e.target.value]?.description)
        setServiceCompanyName(CategoryBase.serviceCompany[e.target.value]?.name)
        setService_company(CategoryBase.serviceCompany[e.target.value]?.id)
    }

    const DateNow = new Date();
    const handleSetService_date = (date:any) => {
        setService_date(date);
    }
    const handleSetOrder_date = (date:any) => {
        setOrder_date(date);
    }
    const handleCreate = async () => {
        if (machine_id && service_view && service_date && development && order_number && order_date &&
            service_company && (validName !== 'Запись под таким номером уже существует!') && !developmentError) {
            try{
                AxiosService.createService({
                    'machine_id': machine_id,
                    'service_view':service_view,
                    'service_date':service_date,
                    'development':development,
                    'order_number':order_number,
                    'order_date':order_date,
                    'service_company':service_company,
                })
                setCreateError(false);
                navigate('/service')
            } catch (error: any) {
                console.error(error.message);
            }
        } else { setCreateError(true);}
    }
    useEffect(() => {
        setValidName('Обязательное поле!');
        DataBase.map((item:any) => {
            switch (item.order_number) {
                case(order_number):
                    setValidName('Запись под таким номером уже существует!');
                    break;
            }
        })
    }, [order_number] );

    useEffect(() => {
        setDevelopmentError(false)
        if (development && (!Number(development))) {
            setDevelopmentError(true);
        }
    }, [development]); // eslint-disable-line

    useEffect(() => {
        const requestMachine = async () => {
            try{
                const CategoryData = await AxiosService.getServiceCategory();
                dispatch(addCategory(CategoryData))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestMachine ()
    }, [click]);

    useEffect(() => {
        const requestMachine = async () => {
            try{
                const Data = await AxiosService.getMachineList();
                dispatch(addMachineListBase(Data.data))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestMachine ()
    }, []);

    if (Status.length) {
        return (
            <div className='create-conteiner'>
                <table className='create-table'>
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
                    <tr>
                        <td>
                            <p className='model'>
                                <select className='create-input'
                                        onChange={(e: any) => setMachine_id(e.target.value)}>
                                    <option/>
                                    {MachineBase?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={item.id}>
                                            {item.machine_id}
                                        </option>
                                    ))}
                                </select>
                                {createError && !machine_id ?
                                    <p className='create-error'>Выберите № машины!!!</p> : ''}
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
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                    <CreateModel
                                        category='serviceView'
                                        value={service_view}
                                        modelName={serviceViewName}
                                        modelDescription={serviceViewDescription}/>
                                </span>
                                {createError && !service_view ?
                                    <p className='create-error'>Выберите модель</p> : ''}
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
                                        onChange={handleSetService_date}
                                        maxDate={DateNow}
                                        dateFormat="dd.MM.yyyy"/>
                                </form>
                                {createError && !service_date ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setDevelopment(e.target.value)}/>
                                {(createError && !development) || developmentError ?
                                    <p className='create-error'>Введите корректные данные!!!</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setOrder_number(e.target.value)}/>
                                {(createError && !order_number) || (validName === 'Запись под таким номером уже существует!') ?
                                    <p className='create-error'>{validName}</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <form>
                                    <DatePicker
                                        className='create-input'
                                        // @ts-ignore
                                        selected={order_date}
                                        onChange={handleSetOrder_date}
                                        maxDate={DateNow}
                                        dateFormat="dd.MM.yyyy"/>
                                </form>
                                {createError && !order_date ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
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
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                    <CreateModel
                                        category='serviceCompany'
                                        value={service_company}
                                        modelName={serviceCompanyName}
                                        modelDescription={serviceCompanyDescription}
                                    />
                                </span>
                                {createError && !service_company ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                            <p className='description'>{serviceCompanyDescription}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="btn-block">
                    <button
                        className="create-btn"
                        onClick={handleCreate}
                        style={createError ? {color: 'red', borderColor: 'red'} : {}}>
                        Создать
                    </button>
                </div>
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


export default CreateService;