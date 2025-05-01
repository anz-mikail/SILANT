import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom";
import {addCategory, addId, addMachineBase} from "../../../store/slice";
import AxiosService from "../../../axios/Axios";


function Machine() {
    const dispatch = useDispatch();
    // @ts-ignore
    const DataBase= useSelector(state => state.Data);
    // @ts-ignore
    const Status = useSelector(state => (state.Data.Status));
    const navigate = useNavigate();

    const [machine_id, setMachine_id] = useState<string>('');
    const [technics, setTechnics] = useState<string>('');
    const [engines, setEngines] = useState<string>('');
    const [transmissions, setTransmissions] = useState<string>('');
    const [leadingAxle, setLeadingAxle] = useState<string>('');
    const [controlledBridge, setControlledBridge] = useState<string>('');

    const handleClickId = (value: any) => {
        dispatch(addId(value))
        navigate('/machine/id')
    }
    useEffect(() => {
        const requestMachine = async () => {
            try{
                const Data = await AxiosService.getMachine();
                dispatch(addMachineBase(Data.data))
                const CategoryData = await AxiosService.getMachineCategory();
                dispatch(addCategory(CategoryData))
            } catch (error: any) {
                console.error(error.message);
            }
        }
        requestMachine ()
    }, []);

    if (Status.length) {
        return (
            <div className='machine-container'>
                <span style={Status !== 'Manager'? {display: 'none'}: {} }>
                    <Link
                        className='Link-create'
                        to='/machine/create'>
                    Создать новую запись
                </Link>
                </span>
                <table className='MachineTable'>
                    <thead>
                    <tr>
                        <th>
                            <p>Даты отправки:</p>
                        </th>
                        <th>
                            <p>Зав. № машины:</p>
                            <input
                                placeholder='Поиск'
                                onChange={e => setMachine_id(e.target.value)}/>
                        </th>
                        <th>
                            <p>Модель техники:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setTechnics(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.technics?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Модель двигателя:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setEngines(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.engines?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Модель трансмиссии:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setTransmissions(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.transmissions?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Модель ведущего моста:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setLeadingAxle(e.target.value)}>
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.leadingAxle?.map((item: any, index: any) => (
                                    <option
                                        key={index}
                                        value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <p>Модель управляемого моста:</p>
                            <select
                                className='select'
                                onChange={(e: any) => setControlledBridge(e.target.value)}
                            >
                                <option style={{color: 'grey',}} value=''>Фильтр</option>
                                {DataBase.CategoryBase.controlledBridge?.map((item: any, index: any) => (
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
                        {DataBase.machineBase?.map((item: any, index: any) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    handleClickId(index)
                                }}
                                style={machine_id &&
                                    ((machine_id.slice(0, machine_id.length) !== item.machine_id.slice(0, machine_id.length))
                                || (technics && technics !== item.technic_model.name)
                                || (engines && engines !== item.engines_model.name)
                                || (transmissions && transmissions !== item.transmission_model.name)
                                || (leadingAxle && leadingAxle !== item.leading_axle_model.name)
                                || (controlledBridge && controlledBridge !== item.controller_bridge_model.name))
                                    ? {display: 'none'} : {color: 'black'}}>
                                <td>{item.shipping_date}</td>
                                <td>{item.machine_id}</td>
                                <td>{item.technic_model.name}</td>
                                <td>{item.engines_model.name}</td>
                                <td>{item.transmission_model.name}</td>
                                <td>{item.leading_axle_model.name}</td>
                                <td>{item.controller_bridge_model.name}</td>
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


export default Machine;