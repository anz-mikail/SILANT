import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom";
import {addCategory, addComplaintBase, addId }
    from "../../../store/slice";
import '../GeneralTable.css'
import AxiosService from "../../../axios/Axios";


function Complaint() {
    const dispatch = useDispatch()
    // @ts-ignore
    const DataBase = useSelector(state => state.Data)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();

    const [machine_id, setMachine_id] = useState<string>('');
    const [failureNode, setFailureNode] = useState<string>('');
    const [recoveryMethod, setRecoveryMethod] = useState<string>('');
    const [serviceCompany, setServiceCompany] = useState<string>('');

    const handleClickId = (value: any) => {
        dispatch(addId(value))
        navigate('/complaint/id')
    }

    useEffect(() => {
        const requestMachine = async () => {
            try{
                const Data = await AxiosService.getComplaint();
                dispatch(addComplaintBase(Data.data))
                const CategoryData = await AxiosService.getComplaintCategory();
                dispatch(addCategory(CategoryData))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestMachine ()
    }, []); // eslint-disable-line
    if (Status.length) {
        return (
            <div className='machine-container'>
                <span style={Status === 'Manager' || Status === 'ServiceCompany'?
                    {} : {display: 'none'}}>
                    <Link
                        className='Link-create'
                        to='/complaint/create'>
                        Создать новую запись
                    </Link>
                </span>
                <table className='MachineTable'>
                    <thead>
                    <tr>
                        <th>
                            <p>Зав. № машины:</p>
                            <input
                                placeholder='Поиск'
                                onChange={e => setMachine_id(e.target.value)}/>
                        </th>
                        <th>
                            <p>Дата отказа:</p>
                        </th>
                        <th>
                            <p>Наработка:</p>
                        </th>
                        <th>
                            <p>Узел отказа:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setFailureNode(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.failureNode?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Описание отказа:</p>
                        </th>
                        <th>
                            <p>Способ восстановления:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setRecoveryMethod(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.recoveryMethod?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Используемые запасные части:</p>
                        </th>
                        <th>
                            <p>Дата восстановления:</p>
                        </th>
                        <th>
                            <p>Время простоя техники:</p>
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
                    {DataBase.complaintBase?.map((item: any, index: any) => (
                        <tr
                            key={index}
                            onClick={() => {
                                handleClickId(index)
                            }}
                            style={(machine_id && (machine_id.slice(0, machine_id.length) !==
                            item.machine_id.machine_id.slice(0, machine_id.length)))
                            || ((failureNode && failureNode !== item.failure_node.name)
                            || (recoveryMethod && recoveryMethod !== item.recovery_method.name)
                            || (serviceCompany && serviceCompany !== item.service_company.name))
                                ? {display: 'none'} : {color: 'black'}}>
                            <td>{item.machine_id.machine_id}</td>
                            <td>{item.refusal_date}</td>
                            <td>{item.development}</td>
                            <td>{item.failure_node.name}</td>
                            <td>{item.failure_node.description}</td>
                            <td>{item.recovery_method.name}</td>
                            <td>{item.spare_parts}</td>
                            <td>{item.recovery_date}</td>
                            <td>{Number(item.recovery_date.slice(5, 7)) > Number(item.refusal_date.slice(5, 7)) ?
                                Number(item.recovery_date.slice(8, 10)) - Number(item.refusal_date.slice(8, 10)) +
                                ((Number(item.recovery_date.slice(5, 7)) - Number(item.refusal_date.slice(5, 7))) * 30) :
                                Number(item.recovery_date.slice(8, 10)) - Number(item.refusal_date.slice(8, 10))}
                            </td>
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


export default Complaint;