import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import AxiosService from "../../../axios/Axios";
import CreateModel from '../CreateModel/CreateModel'
import { addCategory } from "../../../store/slice";
import '../LocalTable.css'


function CreateMachine() {
    const dispatch: any = useDispatch()
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.machineBase)
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
    const [technic_model, setTechnic_model] = useState<number>();
    const [engines_model, setEngines_model] = useState<number>();
    const [engines_id, setEngines_id] = useState('');
    const [transmission_model, setTransmission_model] = useState<number>();
    const [transmission_id, setTransmission_id] = useState('');
    const [leading_axle_model, setLeading_axle_model] = useState<number>();
    const [leading_axle_id, setLeading_axle_id] = useState('');
    const [controller_bridge_model, setController_bridge_model] = useState<number>();
    const [controller_bridge_id, setController_bridge_id] = useState('');
    const [supply_contract, setSupply_contract] = useState('');
    const [shipping_date, setShipping_date] = useState('');
    const [consignee, setConsignee] = useState('');
    const [delivery_address, setDelivery_address] = useState('');
    const [equipment, setEquipment] = useState('');
    const [client, setClient] = useState<number>();
    const [service_company, setService_company] = useState<number>();

    const [technicModelName, setTechnicName] = useState('');
    const [technicModelDescription, setTechnicDescription] = useState('');
    const [enginesModelName, setEnginesName] = useState('');
    const [enginesModelDescription, setEnginesDescription] = useState('');
    const [transmissionName, setTransmissionName] = useState('');
    const [transmissionDescription, setTransmissionDescription] = useState('');
    const [leadingAxleName, setLeadingAxleName] = useState('');
    const [leadingAxleDescription, setLeadingAxleDescription] = useState('');
    const [controllerBridgeName, setControllerBridgeName] = useState('');
    const [controllerBridgeDescription, setControllerBridgeDescription] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientDescription, setClientDescription] = useState('');
    const [serviceCompanyName, setServiceCompanyName] = useState('');
    const [serviceCompanyDescription, setServiceCompanyDescription] = useState('');

    const handleTechnic = (e: any) => {
        setTechnicDescription(CategoryBase.technics[e.target.value]?.description)
        setTechnicName(CategoryBase.technics[e.target.value]?.name)
        setTechnic_model(CategoryBase.technics[e.target.value]?.id)
    }
    const handleEngines = (e: any) => {
        setEnginesDescription(CategoryBase.engines[e.target.value]?.description)
        setEnginesName(CategoryBase.engines[e.target.value]?.name)
        setEngines_model(CategoryBase.engines[e.target.value]?.id)
    }
    const handleTransmission = (e: any) => {
        setTransmissionDescription(CategoryBase.transmissions[e.target.value]?.description)
        setTransmissionName(CategoryBase.transmissions[e.target.value]?.name)
        setTransmission_model(CategoryBase.transmissions[e.target.value]?.id)
    }
    const handleLeadingAxle = (e: any) => {
        setLeadingAxleDescription(CategoryBase.leadingAxle[e.target.value]?.description)
        setLeadingAxleName(CategoryBase.leadingAxle[e.target.value]?.name)
        setLeading_axle_model(CategoryBase.leadingAxle[e.target.value]?.id)
    }
    const handleControllerBridge = (e: any) => {
        setControllerBridgeDescription(CategoryBase.controlledBridge[e.target.value]?.description)
        setControllerBridgeName(CategoryBase.controlledBridge[e.target.value]?.name)
        setController_bridge_model(CategoryBase.controlledBridge[e.target.value]?.id)
    }
    const handleClient = (e: any) => {
        setClientDescription(CategoryBase.clients[e.target.value].description)
        setClientName(CategoryBase.clients[e.target.value].name)
        setClient(CategoryBase.clients[e.target.value].id)
    }
    const handleServiceCompany = (e: any) => {
        setServiceCompanyDescription(CategoryBase.serviceCompany[e.target.value].description)
        setServiceCompanyName(CategoryBase.serviceCompany[e.target.value].name)
        setService_company(CategoryBase.serviceCompany[e.target.value].id)
    }
    const [createError, setCreateError] = useState<boolean>(false);
    const [validName, setValidName] = useState<string>('');

    const DateNow = new Date();
    const handleSetDate = (date:any) => {
        setShipping_date(date);
    }
    const handleCreate = async () => {
        if (machine_id && technic_model && engines_model && engines_id && transmission_model &&
            transmission_id && leading_axle_model && leading_axle_id && controller_bridge_model &&
            controller_bridge_id && supply_contract && shipping_date && consignee && delivery_address &&
            equipment && client && service_company && (validName !== 'Запись под таким номером уже существует!')) {
            try{
                AxiosService.createMachine({
                    'machine_id':machine_id,
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
                setCreateError(false);
                navigate('/machine')
            } catch (error: any) {
                console.error(error.message);}
        } else { setCreateError(true);}
    }
    useEffect(() => {
        setValidName('Обязательное поле!');
        DataBase.forEach((item:any) => {
            switch (item.machine_id) {
                case(machine_id):
                    setValidName('Запись под таким номером уже существует!');
                }
            }
        )
    }, [machine_id] ); // eslint-disable-line

    useEffect(() => {
        const requestMachine = async () => {
            try{
                const CategoryData = await AxiosService.getMachineCategory();
                dispatch(addCategory(CategoryData))
            } catch (error: any) {
                console.error(error.message);}}
        requestMachine ()
    }, [click] ); // eslint-disable-line

    if (Status === 'Manager') {
        return (
            <div className='create-conteiner'>
                <table className='create-table'>
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
                    <tr>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setMachine_id(e.target.value)}/>
                                {(createError && !machine_id) || (validName === 'Запись под таким номером уже существует!') ?
                                    <p className='create-error'>{validName}</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleTechnic}>
                                    <option/>
                                    {CategoryBase.technics?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                <CreateModel
                                    category='technics'
                                    value={technic_model}
                                    modelName={technicModelName}
                                    modelDescription={technicModelDescription}/>
                                </span>
                                {createError && !technic_model ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                                <p className='description'>{technicModelDescription}</p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleEngines}>
                                    <option/>
                                    {CategoryBase.engines?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                <CreateModel
                                    category='engines'
                                    value={engines_model}
                                    modelName={enginesModelName}
                                    modelDescription={enginesModelDescription}/>
                                </span>
                                {createError && !engines_model ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                                <p className='description'>{enginesModelDescription}</p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setEngines_id(e.target.value)}/>
                                {createError && !engines_id ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleTransmission}>
                                    <option/>
                                    {CategoryBase.transmissions?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                <CreateModel
                                    category='transmissions'
                                    value={transmission_model}
                                    modelName={transmissionName}
                                    modelDescription={transmissionDescription}/>
                                </span>
                                {createError && !transmission_model ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                                <p className='description'>{transmissionDescription}</p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setTransmission_id(e.target.value)}/>
                                {createError && !transmission_id ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleLeadingAxle}>
                                    <option/>
                                    {CategoryBase.leadingAxle?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                <CreateModel
                                    category='leadingAxle'
                                    value={leading_axle_model}
                                    modelName={leadingAxleName}
                                    modelDescription={leadingAxleDescription}/>
                                </span>
                                {createError && !leading_axle_model ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                                <p className='description'>{leadingAxleDescription}</p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setLeading_axle_id(e.target.value)}/>
                                {createError && !leading_axle_id ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleControllerBridge}>
                                    <option/>
                                    {CategoryBase.controlledBridge?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                <CreateModel
                                    category='controlledBridge'
                                    value={controller_bridge_model}
                                    modelName={controllerBridgeName}
                                    modelDescription={controllerBridgeDescription}/>
                                </span>
                                {createError && !controller_bridge_model ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                                <p className='description'>{controllerBridgeDescription}</p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setController_bridge_id(e.target.value)}/>
                                {createError && !controller_bridge_id ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <input
                                    className='create-input'
                                    onChange={e => setSupply_contract(e.target.value)}/>
                                {createError && !supply_contract ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <form>
                                    <DatePicker
                                        className='create-input'
                                        // @ts-ignore
                                        selected={shipping_date}
                                        onChange={handleSetDate}
                                        maxDate={DateNow}
                                        dateFormat="dd.MM.yyyy"/>
                                </form>
                                {createError && !shipping_date?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='idStr'>
                                <textarea
                                    className='create-input'
                                    onChange={e => setConsignee(e.target.value)}/>
                                {createError && !consignee ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='idStr'>
                                <textarea
                                    className='create-input'
                                    onChange={e => setDelivery_address(e.target.value)}/>
                                {createError && !delivery_address?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='idStr'>
                               <textarea
                                   className='create-input'
                                   onChange={e => setEquipment(e.target.value)}/>
                                {createError && !equipment ?
                                    <p className='create-error'>Обязательное поле</p> : ''}
                            </p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleClient}>
                                    <option/>
                                    {CategoryBase.clients?.map((item: any, index: any) => (
                                        <option
                                            key={index}
                                            value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='add-icon' onClick={handleClick}>
                                <CreateModel
                                    category='clients'
                                    value={client}
                                    modelName={clientName}
                                    modelDescription={clientDescription}/>
                                </span>
                                {createError && !client ?
                                    <p className='create-error'>Выберите модель</p> : ''}
                            </p>
                                <p className='description'>{clientDescription}</p>
                        </td>
                        <td>
                            <p className='model'>
                                <select className='create-input' onChange={handleServiceCompany}>
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
                                    modelDescription={serviceCompanyDescription}/>
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
                        style={createError? {color: 'red', borderColor: 'red'}: {}}>
                        Создать
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1 className='access-text'>У вас не доступа к этой странице!!!</h1>
                {navigate('/')}
            </>
        )
    }
}


export default CreateMachine;