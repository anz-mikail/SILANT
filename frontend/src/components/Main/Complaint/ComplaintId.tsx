import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AxiosService from "../../../axios/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {addMachineListBase} from "../../../store/slice";


function ComplaintId() {
    const dispatch = useDispatch();
    // @ts-ignore
    const MachineBase = useSelector(state => state.Data.machineListBase)
    // @ts-ignore
    const GlobalBase = useSelector(state => state.Data.complaintBase)
    // @ts-ignore
    const Id = useSelector(state => state.Data.Id)
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.complaintBase[Id])
    // @ts-ignore
    const CategoryBase = useSelector(state => state.Data.CategoryBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();
    const [clickChange, setClickChange] = useState<boolean>(false);

    const [machine_id, setMachine_id] = useState('');
    const [refusal_date, setRefusal_date] = useState('');
    const [development, setDevelopment] = useState('');
    const [failure_node, setFailure_node] = useState('');
    const [description_node, setDescription_node] = useState('');
    const [recovery_method, setRecovery_method] = useState('');
    const [spare_parts, setSpare_parts] = useState('');
    const [recovery_date, setRecovery_date] = useState('');
    const [service_company, setService_company] = useState('');

    const [recoveryMethodDescription, setRecoveryMethodDescription] = useState('');
    const [failureNodeDescription, setFailureNodeDescription] = useState('');
    const [serviceCompanyDescription, setServiceCompanyDescription] = useState('');

    const [validError, setValidError ] = useState<boolean>(false);
    const [developmentError, setDevelopmentError ] = useState<boolean>(false);

    const handleRecoveryMethod = (e: any) => {
        setRecoveryMethodDescription(CategoryBase.recoveryMethod[e.target.value]?.description)
        setRecovery_method(CategoryBase.recoveryMethod[e.target.value]?.id)
    }
    const handleFailureNode = (e: any) => {
        setFailureNodeDescription(CategoryBase.failureNode[e.target.value]?.description)
        setFailure_node(CategoryBase.failureNode[e.target.value]?.id)
    }
    const handleServiceCompany = (e: any) => {
        setServiceCompanyDescription(CategoryBase.serviceCompany[e.target.value]?.description)
        setService_company(CategoryBase.serviceCompany[e.target.value]?.id)
    }
    useEffect(() => {
        setValidError(false)
        if (machine_id) {
            GlobalBase?.forEach((item: any) => {
                switch (item.machine_id) {
                    case(machine_id):
                        setValidError(true);
                    }
                }
            )
        }
    }, [machine_id] ); // eslint-disable-line

    useEffect(() => {
        setDevelopmentError(false)
        if (development && (!Number(development))) {
            setDevelopmentError(true);
        }
    }, [development]); // eslint-disable-line

    useEffect(() => {
        const requestComplaint = async () => {
            try{
                const Data = await AxiosService.getMachineList();
                dispatch(addMachineListBase(Data.data))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestComplaint ()
    }, []); // eslint-disable-line

    const handleClickChange = () => {
        clickChange ? setClickChange(false) : setClickChange(true);
    }
    const handleSave = async () => {
        if (!validError && !developmentError){
            try{
                AxiosService.postComplaint({
                    'id': String(DataBase.id),
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
                navigate('/complaint')
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }
    const handleDelete = () => {
        const ListDelete = async () => {
            try{
                AxiosService.deleteComplaint({
                    'id': DataBase.id
                })
                navigate('/complaint')
            } catch (error: any) {
                console.error(error.message);}
        }
        const conf = window.confirm('Вы уверены что хотите удалить запись?',)
        if (conf) {ListDelete()}
    }
    const DateNow = new Date();
    const handleRefusal_date = (date:any) => {
        setRefusal_date(date);
    }
    const handleRecovery_date = (date:any) => {
        setRecovery_date(date);
    }
    if (Status.length && GlobalBase.length) {
        return (
            <div className='Id-conteiner'>
                <div
                    className="btn-block"
                     style={(Status === 'Manager') || (Status === 'ServiceCompany')?
                         {} : {display: 'none'}}
                >
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
                            <p className='model'>Время простоя:</p>
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
                                <p className='model'>{DataBase.refusal_date}</p>
                            </td>
                            <td>
                            <p className='model'>{DataBase.development}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.failure_node.name}</p>
                                <p className='description'>{DataBase.failure_node.description}</p>
                            </td>
                            <td className='idStr'>
                                {DataBase.description_node}
                            </td>
                            <td>
                                <p className='model'>{DataBase.recovery_method.name}</p>
                                <p className='description'>{DataBase.recovery_method.description}</p>
                            </td>
                            <td className='idStr'>{DataBase.spare_parts}</td>
                            <td>
                                <p className='model'>{DataBase.recovery_date}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    {Number(DataBase.recovery_date.slice(5, 7)) > Number(DataBase.refusal_date.slice(5, 7)) ?
                                    Number(DataBase.recovery_date.slice(8, 10)) - Number(DataBase.refusal_date.slice(8, 10)) +
                                    ((Number(DataBase.recovery_date.slice(5, 7)) - Number(DataBase.refusal_date.slice(5, 7))) * 30) :
                                    Number(DataBase.recovery_date.slice(8, 10)) - Number(DataBase.refusal_date.slice(8, 10))}
                                </p>
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
                                        {MachineBase?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={item.id}
                                                defaultValue={DataBase.machine_id.machine_id}>
                                                {item.machine_id}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <form>
                                        <DatePicker
                                            className='create-input'
                                            // @ts-ignore
                                            selected={refusal_date}
                                            placeholderText={DataBase.refusal_date}
                                            onChange={handleRefusal_date}
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
                                        onChange={e => setDevelopment(e.target.value)}
                                        defaultValue={DataBase?.development}
                                    />
                                    <p className='create-error'
                                       style={developmentError ? {} : {display: 'none'}}>
                                        Впишите корректные данные!!!
                                    </p>
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
                                                value={index}
                                                defaultValue={DataBase.failure_node.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{failureNodeDescription}</p>
                            </td>
                            <td>
                                <p className='idStr'>
                                    <textarea
                                        className='create-input'
                                        onChange={e => setDescription_node(e.target.value)}
                                        defaultValue={DataBase?.description_node}/>
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
                                                value={index}
                                                defaultValue={DataBase.recovery_method.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{recoveryMethodDescription}</p>
                            </td>
                            <td>
                                <p className='idStr'>
                                    <textarea
                                        className='create-input'
                                        onChange={e => setSpare_parts(e.target.value)}
                                        defaultValue={DataBase?.spare_parts}/>
                                    </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <form>
                                        <DatePicker
                                            className='create-input'
                                            // @ts-ignore
                                            selected={recovery_date}
                                            placeholderText={DataBase.recovery_date}
                                            onChange={handleRecovery_date}
                                            maxDate={DateNow}
                                            dateFormat="dd.MM.yyyy"/>
                                    </form>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    {Number(DataBase.recovery_date.slice(5, 7)) > Number(DataBase.refusal_date.slice(5, 7)) ?
                                    Number(DataBase.recovery_date.slice(8, 10)) - Number(DataBase.refusal_date.slice(8, 10)) +
                                    ((Number(DataBase.recovery_date.slice(5, 7)) - Number(DataBase.refusal_date.slice(5, 7))) * 30) :
                                    Number(DataBase.recovery_date.slice(8, 10)) - Number(DataBase.refusal_date.slice(8, 10))}
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    {/*{(Status === 'Manager'?*/}
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
                                    {/*: <>{service_company}</>)}*/}
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
                        style={clickChange ? {display: 'block'} : {display: 'none'}}>Сохранить
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>Эта страница доступна только авторизованным!!!</h1>
                {navigate('/complaint')}
            </>
        )
    }
}


export default ComplaintId;