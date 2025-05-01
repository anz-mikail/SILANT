import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import AxiosService from "../../../axios/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


function MachineId() {
    // @ts-ignore
    const GlobalBase = useSelector(state => state.Data.machineBase)
    // @ts-ignore
    const Id = useSelector(state => state.Data.Id)
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.machineBase[Id])
    // @ts-ignore
    const CategoryBase = useSelector(state => state.Data.CategoryBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const navigate = useNavigate();
    const [clickChange, setClickChange] = useState<boolean>(false);

    const [machine_id, setMachine_id] = useState('');
    const [technic_model, setTechnic_model] = useState('');
    const [engines_model, setEngines_model] = useState('');
    const [engines_id, setEngines_id] = useState('');
    const [transmission_model, setTransmission_model] = useState('');
    const [transmission_id, setTransmission_id] = useState('');
    const [leading_axle_model, setLeading_axle_model] = useState('');
    const [leading_axle_id, setLeading_axle_id] = useState('');
    const [controller_bridge_model, setController_bridge_model] = useState('');
    const [controller_bridge_id, setController_bridge_id] = useState('');
    const [supply_contract, setSupply_contract] = useState('');
    const [shipping_date, setShipping_date] = useState('');
    const [consignee, setConsignee] = useState('');
    const [delivery_address, setDelivery_address] = useState('');
    const [equipment, setEquipment] = useState('');
    const [client, setClient] = useState('');
    const [service_company, setService_company] = useState('');

    const [technicModelDescription, setTechnicDescription] = useState('');
    const [enginesModelDescription, setEnginesDescription] = useState('');
    const [transmissionDescription, setTransmissionDescription] = useState('');
    const [leadingAxleDescription, setLeadingAxleDescription] = useState('');
    const [controllerBridgeDescription, setControllerBridgeDescription] = useState('');
    const [clientDescription, setClientDescription] = useState('');
    const [serviceCompanyDescription, setServiceCompanyDescription] = useState('');

    const handleTechnic = (e: any) => {
        setTechnicDescription(CategoryBase.technics[e.target.value]?.description)
        setTechnic_model(CategoryBase.technics[e.target.value]?.id)
    }
    const handleEngines = (e: any) => {
        setEnginesDescription(CategoryBase.engines[e.target.value]?.description)
        setEngines_model(CategoryBase.engines[e.target.value]?.id)
    }
    const handleTransmission = (e: any) => {
        setTransmissionDescription(CategoryBase.transmissions[e.target.value]?.description)
        setTransmission_model(CategoryBase.transmissions[e.target.value]?.id)
    }
    const handleLeadingAxle = (e: any) => {
        setLeadingAxleDescription(CategoryBase.leadingAxle[e.target.value]?.description)
        setLeading_axle_model(CategoryBase.leadingAxle[e.target.value]?.id)
    }
    const handleControllerBridge = (e: any) => {
        setControllerBridgeDescription(CategoryBase.controlledBridge[e.target.value]?.description)
        setController_bridge_model(CategoryBase.controlledBridge[e.target.value]?.id)
    }
    const handleClient = (e: any) => {
        setClientDescription(CategoryBase.clients[e.target.value].description)
        setClient(CategoryBase.clients[e.target.value].id)
    }
    const handleServiceCompany = (e: any) => {
        setServiceCompanyDescription(CategoryBase.serviceCompany[e.target.value].description)
        setService_company(CategoryBase.serviceCompany[e.target.value].id)
    }

    const [validError, setValidError ] = useState<boolean>(false);

    useEffect(() => {
        setValidError(false)
        if (machine_id){
            GlobalBase?.forEach((item:any) => {
                switch (item.machine_id) {
                    case(machine_id):
                        setValidError(true);
                        break;
                    }
                }
            )
        }
    }, [machine_id] ); // eslint-disable-line

    const handleClickChange = () => {
        clickChange ? setClickChange(false) : setClickChange(true);
    }
    const handleSave = async () => {
        if (!validError){
            try{
                AxiosService.postMachine({
                    'id': DataBase.machine_id,
                    'machine_id': machine_id,
                    'technic_model':technic_model,
                    'engines_model':engines_model,
                    'engines_id':engines_id,
                    'transmission_model':transmission_model,
                    'transmission_id':transmission_id,
                    'leading_axle_model':leading_axle_model,
                    'leading_axle_id':leading_axle_id,
                    'controller_bridge_model':controller_bridge_model,
                    'controller_bridge_id':controller_bridge_id,
                    'supply_contract':supply_contract,
                    'shipping_date':shipping_date,
                    'consignee':consignee,
                    'delivery_address':delivery_address,
                    'equipment':equipment,
                    'client':client,
                    'service_company':service_company,
                })
                navigate('/machine')
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }
    const handleDelete = () => {
        const ListDelete = async () => {
            try{
                AxiosService.deleteMachine({'id': DataBase.machine_id})
                navigate('/machine')
            } catch (error: any) {
                console.error(error.message);}
        }
        const conf = window.confirm('Вы уверены что хотите удалить запись?',)
        if (conf) {ListDelete()}
    }
    const DateNow = new Date();
    const handleSetDate = (date:any) => {
        setShipping_date(date);
    }
    if (Status.length && GlobalBase.length) {
        return (
            <div className='Id-conteiner'>
                <div className="btn-block" style={Status !== 'Manager'? {display: 'none'}: {}}>
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
                            <p className='model'>Заводской № машины:</p>
                        </th>
                        <th>
                            <p className='model'>Модель техники:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th>
                            <p className='model'>Модель двигателя:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th>
                            <p className='model'>Зав. № двигателя:</p>
                        </th>
                        <th>
                            <p className='model'>Модель трансмиссии:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th>
                            <p className='model'>Зав. № трансмиссии:</p>
                        </th>
                        <th>
                            <p className='model'>Модель ведущего моста:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th>
                            <p className='model'>Зав. № ведущего моста:</p>
                        </th>
                        <th>
                            <p className='model'>Модель управляемого моста:</p>
                            <p className='description'>Описание:</p>
                        </th>
                        <th>
                            <p className='model'>Зав. № управляемого моста:</p>
                        </th>
                        <th>
                            <p className='model'>Договор поставки №, дата:</p>
                        </th>
                        <th>
                            <p className='model'>Дата отгрузки с завода:</p>
                        </th>
                        <th className='idStr'>Грузополучатель:</th>
                        <th className='idStr'>Адрес поставки:</th>
                        <th className='idStr'>Комплектация:</th>
                        <th>
                            <p className='model'>Клиент:</p>
                            <p className='description'>Описание:</p>
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
                                <p className='model'>{DataBase.machine_id}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.technic_model.name}</p>
                                <p className='description'>{DataBase.technic_model.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.engines_model.name}</p>
                                <p className='description'>{DataBase.engines_model.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.engines_id}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.transmission_model.name}</p>
                                <p className='description'>{DataBase.transmission_model.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.transmission_id}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.leading_axle_model.name}</p>
                                <p className='description'>{DataBase.leading_axle_model.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.leading_axle_id}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.controller_bridge_model.name}</p>
                                <p className='description'>{DataBase.controller_bridge_model.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.controller_bridge_id}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.supply_contract}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.shipping_date}</p>
                            </td>
                            <td className='idStr'>{DataBase.consignee}</td>
                            <td className='idStr'>{DataBase.delivery_address}</td>
                            <td className='idStr'>{DataBase.equipment}</td>
                            <td>
                                <p className='model'>{DataBase.client.name}</p>
                                <p className='description'>{DataBase.client.description}</p>
                            </td>
                            <td>
                                <p className='model'>{DataBase.service_company.name}</p>
                                <p className='description'>{DataBase.service_company.description}</p>
                            </td>
                        </tr> :
                        <tr>
                            <td>
                                <p className='model'>
                                    <input className='create-input'
                                            onChange={e => setMachine_id(e.target.value)}
                                            defaultValue={DataBase?.machine_id}/>
                                    <p className='create-error'
                                        style={!validError ? {display: 'none'} : {}}>
                                        Запись под таким номером уже существует!
                                    </p>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleTechnic}
                                    >
                                        <option/>
                                        {CategoryBase.technics?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{technicModelDescription}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleEngines}>
                                        <option/>
                                        {CategoryBase.engines?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.engines_model.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{enginesModelDescription}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={e => setEngines_id(e.target.value)}
                                        defaultValue={DataBase?.engines_id}
                                    />
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleTransmission}>
                                        <option/>
                                        {CategoryBase.transmissions?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.transmission_model.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{transmissionDescription}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={e => setTransmission_id(e.target.value)}
                                        defaultValue={DataBase?.transmission_id}/>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleLeadingAxle}>
                                        <option/>
                                        {CategoryBase.leadingAxle?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.leading_axle_model.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{leadingAxleDescription}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={e => setLeading_axle_id(e.target.value)}
                                        defaultValue={DataBase?.leading_axle_id}/>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleControllerBridge}>
                                        <option/>
                                        {CategoryBase.controlledBridge?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.controller_bridge_model.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{controllerBridgeDescription}</p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={e => setController_bridge_id(e.target.value)}
                                        defaultValue={DataBase?.controller_bridge_id}/>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <input
                                        className='create-input'
                                        onChange={e => setSupply_contract(e.target.value)}
                                        defaultValue={DataBase?.supply_contract}/>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <form>
                                        <DatePicker
                                            className='create-input'
                                            // @ts-ignore
                                            selected={shipping_date}
                                            placeholderText={DataBase.shipping_date}
                                            onChange={handleSetDate}
                                            maxDate={DateNow}
                                            dateFormat="dd.MM.yyyy"/>
                                    </form>
                                </p>
                            </td>
                            <td>
                                <p className='idStr'>
                                    <textarea
                                        className='create-input'
                                        onChange={e => setConsignee(e.target.value)}
                                        defaultValue={DataBase?.consignee}/>
                                </p>
                            </td>
                            <td>
                                <p className='idStr'>
                                    <textarea
                                        className='create-input'
                                        onChange={e => setDelivery_address(e.target.value)}
                                        defaultValue={DataBase?.delivery_address}/>
                                </p>
                            </td>
                            <td>
                                <p className='idStr'>
                                    <textarea
                                        className='create-input'
                                        onChange={e => setEquipment(e.target.value)}
                                        defaultValue={DataBase?.equipment}/>
                                </p>
                            </td>
                            <td>
                                <p className='model'>
                                    <select className='create-input'
                                            onChange={handleClient}>
                                        <option/>
                                        {CategoryBase.clients?.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={index}
                                                defaultValue={DataBase.client.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p className='description'>{clientDescription}</p>
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
                {navigate('/machine')}
            </>
        )
    }
}


export default MachineId;