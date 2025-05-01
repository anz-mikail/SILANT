import React from 'react';
import {  useSelector } from 'react-redux'
import './Table.css'


function Table() {
    // @ts-ignore
    const DataBase = useSelector(state => state.Data.machineBase)

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Зав. № машины</th>
                    <th>Модель техники</th>
                    <th>Модель двигателя</th>
                    <th>Зав. № двигателя</th>
                    <th>Модель трансмиссии</th>
                    <th>Зав. № трансмиссии</th>
                    <th>Модель ведущего моста</th>
                    <th>Зав. № ведущего моста</th>
                    <th>Модель управляемого моста</th>
                    <th>Зав. № управляемого моста</th>
                </tr>
            </thead>
            <tbody>
            {DataBase?.map((item: any, index: any) => (
                <tr key={index}>
                    <td>{item.machine_id}</td>
                    <td>{item.technic_model.name}</td>
                    <td>{item.engines_model.name}</td>
                    <td>{item.engines_id}</td>
                    <td>{item.transmission_model.name}</td>
                    <td>{item.transmission_id}</td>
                    <td>{item.leading_axle_model.name}</td>
                    <td>{item.leading_axle_id}</td>
                    <td>{item.controller_bridge_model.name}</td>
                    <td>{item.controller_bridge_id}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}


export default Table;