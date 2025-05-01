import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Main.css'


function Main() {
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)

    if (!Status.length) {
        return (
            <>
            </>
        );
    } else {
        return (
            <div className="Main">
                <div className='company-name'>
                    <p>{localStorage.getItem('company')}</p>
                    <p>
                        Информация о комплектации и технических характеристиках
                        Вашей техники
                    </p>
                </div>
                <div className='Links'>
                    <Link
                        className='Link'
                        to='/machine'>Технические данные
                    </Link>
                    <Link
                        className='Link'
                        to='/service'>Техническое обслуживание
                    </Link>
                    <Link
                        className='Link'
                        to='/complaint'>Рекламации
                    </Link>
                </div>
            </div>
        )
    }
}


export default Main;