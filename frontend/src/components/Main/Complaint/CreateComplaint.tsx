import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../../axios/Axios";
import CreateModel from '../CreateModel/CreateModel'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import '../LocalTable.css'
import {addCategory, addMachineListBase} from "../../../store/slice";


function CreateComplaint() {
    const dispatch = useDispatch()
    // @ts-ignore
    const MachineBase = useSelector(state => state.Data.machineBase)
    // @ts-ignore
    const CategoryBase = useSelector(state => state.Data.CategoryBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();

    const [click, setClick] = useState(false);
    const handleClick = () => {
        click? setClick(false): setClick(true)
    }
    const [machine_id, setMachine_id] = useState('');
    const [refusal_date, setRefusal_date] = useState('');
    const [development, setDevelopment] = useState('');
    const [failure_node, setFailure_node] = useState<number>();
    const [description_node, setDescription_node] = useState('');
    const [recovery_method, setRecovery_method] = useState<number>();
    const [spare_parts, setSpare_parts] = useState('');
    const [recovery_date, setRecovery_date] = useState('');
    const [service_company, setService_company] = useState<number>();

    const [recoveryMethodName, setRecoveryMethodName] = useState('');
    const [recoveryMethodDescription, setRecoveryMethodDescription] = useState('');
    const [failureNodeName, setFailureNodeName] = useState('');
    const [failureNodeDescription, setFailureNodeDescription] = useState('');
    const [serviceCompanyDescription, setServiceCompanyDescription] = useState('');
    const [serviceCompanyName, setServiceCompanyName] = useState('');

    const [createError, setCreateError] = useState<boolean>(false);
    const [developmentError, setDevelopmentError ] = useState<boolean>(false);

    const handleRecoveryMethod = (e: any) => {
        setRecoveryMethodName(CategoryBase.recoveryMethod[e.target.value]?.name)
        setRecoveryMethodDescription(CategoryBase.recoveryMethod[e.target.value]?.description)
        setRecovery_method(CategoryBase.recoveryMethod[e.target.value]?.id)
    }
    const handleFailureNode = (e: any) => {
        setFailureNodeName(CategoryBase.failureNode[e.target.value]?.name)
        setFailureNodeDescription(CategoryBase.failureNode[e.target.value]?.description)
        setFailure_node(CategoryBase.failureNode[e.target.value]?.id)
    }
    const handleServiceCompany = (e: any) => {
        setServiceCompanyDescription(CategoryBase.serviceCompany[e.target.value]?.description)
        setServiceCompanyName(CategoryBase.serviceCompany[e.target.value]?.name)
        setService_company(CategoryBase.serviceCompany[e.target.value]?.id)
    }

    const DateNow = new Date();
    const handleRefusal_date = (date:any) => {
        setRefusal_date(date);
    }
    const handleRecovery_date = (date:any) => {
        setRecovery_date(date);
    }
    const handleCreate = async () => {
        if (machine_id && refusal_date && development && failure_node && description_node &&
            recovery_method && spare_parts && recovery_date && !developmentError) {
            try{
                AxiosService.createComplaint({
                    'machine_id': machine_id,
                    'refusal_date':refusal_date,
                    'development':development,
                    'failure_node':failure_node,
                    'description_node':description_node,
                    'recovery_method':recovery_method,
                    'spare_parts':spare_parts,
                    'recovery_date':recovery_date,
                    'service_company':service_company,
                })
                setCreateError(false);
                navigate('/complaint')
            } catch (error: any) {
                console.error(error.message);
            }
        } else { setCreateError(true);}
    }
    useEffect(() => {
        const requestMachine = async () => {
            try{
                const CategoryData = await AxiosService.getComplaintCategory();
                dispatch(addCategory(CategoryData))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestMachine ()
        console.log('create-complaint')
    }, [click]); // eslint-disable-line

    useEffect(() => {
        setDevelopmentError(false)
        if (development && (!Number(development))) {
            setDevelopmentError(true);
        }
    }, [development]); // eslint-disable-line

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
    }, []); // eslint-disable-line

    if (Status === 'Manager' || Status === 'ServiceCompany') {
        return (
            <div className='create-conteiner'>
                <table className='create-table'>
                    <thead>
                    <tr>
                        <th>
                            <p className='model'>Заводской номер машины:</p>
                        </th>
                        <th>
                            <p className='model'>Дата отказа:</p>
                        </th>
                        <th>
                            <p className='model'>Наработка:</p>
                        </th>
                        <th>
                            <p className='model'>Узел отказа:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th className='idStr'>Описание отказа:</th>
                        <th>
                            <p className='model'>Способ восстановления:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th className='idStr'>Используемые запчасти:</th>
                        <th>
                            <p className='model'>Дата восстановления:</p>
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
                                <form>
                                    <DatePicker
                                        className='create-input'
                                        // @ts-ignore
                                        selected={refusal_date}
                                        onChange={handleRefusal_date}
                                        maxDate={DateNow}
                                        dateFormat="dd.MM.yyyy"
                                    />
                                </form>
                                {createError && !refusal_date ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setDevelopment(e.target.value)}
                                />
                                {(createError && !development) || developmentError ?
                                    <p className='create-error'>Введите корректные данные!!!</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input'
                                        onChange={handleFailureNode}>
                                    <option/>
                                    {CategoryBase.failureNode?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                    <CreateModel
                                        category='failureNode'
                                        value={failure_node}
                                        modelName={failureNodeName}
                                        modelDescription={failureNodeDescription}/>
                                </span>
                                {createError && !failure_node ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                            <p className='description'>{failureNodeDescription}</p>
                        </td>
                        <td>
                            <p className='idStr'>
                                <textarea
                                    className='create-input'
                                    onChange={e => setDescription_node(e.target.value)}/>
                                {createError && !description_node ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input'
                                        onChange={handleRecoveryMethod}>
                                    <option/>
                                    {CategoryBase.recoveryMethod?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                    <CreateModel
                                        category='recoveryMethod'
                                        value={recovery_method}
                                        modelName={recoveryMethodName}
                                        modelDescription={recoveryMethodDescription}/>
                                </span>
                                {createError && !recovery_method ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                            <p className='description'>{recoveryMethodDescription}</p>
                        </td>
                        <td>
                            <p className='idStr'>
                                <textarea
                                    className='create-input'
                                    onChange={e => setSpare_parts(e.target.value)}/>
                                {createError && !spare_parts ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <form>
                                    <DatePicker
                                        className='create-input'
                                        // @ts-ignore
                                        selected={recovery_date}
                                        onChange={handleRecovery_date}
                                        maxDate={DateNow}
                                        dateFormat="dd.MM.yyyy"
                                    />
                                </form>
                                {createError && !recovery_date ?
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
                        style={createError ? {color: 'var(--red)', borderColor: 'black'} : {}}>
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


export default CreateComplaint;