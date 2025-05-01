import React, {KeyboardEvent, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AxiosService from "../../../axios/Axios";
import { addMachineBase } from "../../../store/slice";
import Table from "./Table/Table";
import './Search.css'


function Search() {
    const dispatch = useDispatch()
    const [searchId, setSearchId] = useState<string>();
    const [click, setClick] = useState<boolean>(false);
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.machineBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)

    const handleClickSearch = () => {
        const Request = async () => {
            try{
                const Data = await AxiosService.getMachineId({
                    'machine_id': String(searchId),
                });
                dispatch(addMachineBase(Data.data.data))
            } catch (error: any) {
                dispatch(addMachineBase([]))
                console.error(error.message);
            }
        }
        Request()
        setClick(true)
    }
    const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
        if(event.key === 'Enter'){
            handleClickSearch()}
    };
    if (Status.length) {
        return (<></>)
    } else {
        return (
            <div className="search-conteiner">
                <h3>Проверьте комплектацию и технические характеристики техники Силант</h3>
                <div className="search">
                    <div>
                        <input
                            placeholder='Введите Зав. № машины'
                            onChange={(e) => setSearchId(e.target.value)}
                            onKeyPress={handleKeyPress}/>
                    </div>
                    <div>
                        <button onClick={handleClickSearch}>Поиск</button>
                    </div>
                </div>
                <div style={(DataBase.length > 0) && click ? {display: 'block'} : {display: 'none'}}>
                    <p>Результат поиска:</p>
                    <h3 style={{textAlign: 'center'}}>
                        Информация о комплектации и технических характеристиках Вашей техники
                    </h3>
                    <Table/>
                </div>
                <div style={(DataBase.length === 0) && click ?
                    {display: 'block', textAlign: 'center', marginTop: '100px'}
                    : {display: 'none'}}>
                    <h2>По вашему запросу ничего не найдено!!!</h2>
                </div>
            </div>
        );
    }
}


export default Search;