import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addComplaintBase, addMachineBase,
    addServiceBase, addStatus, addId,
    addCategory, addMachineListBase
} from "../../store/slice";
import './Header.css';
// @ts-ignore
import Logo from '../../image/Logotype.jpg';
import AxiosService from "../../axios/Axios";
import {KeyboardEvent} from 'react';


function Header() {
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const dispatch = useDispatch()

    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [validLogin, setValidLogin] = useState<string>('');

    const [menuActive, setMenuActive] = useState<boolean>(true);

    const handleClickSingIn = async () => {
        try {
            const Data = await AxiosService.getAuthorization({
                'login': login,
                'password': password,
            })
            if (Data.data.status === 'ServiceCompany') {
                localStorage.setItem('company', Data.data.service_company.name)
            } else if (Data.data.status === 'Client') {
                localStorage.setItem('company', Data.data.client.name)
            } else {
                localStorage.setItem('company', "Менеджер компании")
            }
            localStorage.setItem('status', Data.data.status);
            localStorage.setItem('token', Data.data.token);
            dispatch(addStatus(Data.data.status));
            setValidLogin('')
        } catch (error: any) {
            console.error(error.message);
            setValidLogin('Неправильный логин или пароль!!!')
        }
    }
    const handleClickSingOut = () => {
        dispatch(addMachineBase([]))
        dispatch(addServiceBase([]))
        dispatch(addComplaintBase([]))
        dispatch(addCategory([]))
        dispatch(addMachineListBase([]))
        dispatch(addId([]))
        dispatch(addStatus([]))
        localStorage.clear()
    }
    useEffect(() => {
        if (localStorage.getItem('status')) {
            dispatch(addStatus(localStorage.getItem('status')))
        }
    }, []); // eslint-disable-line

    const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
        if(event.key === 'Enter'){
            handleClickSingIn()}
    };
    const change_btn = () => {setMenuActive(!menuActive)}
    return(
        <div className="Header">
            <div className="Header-Block1">
                <img src={Logo} alt="logo" className='logo'/>
                <div className="Header-Block2">
                    <p>+7 (8352) 20-12-09, telegram</p>
                    <p>Электронная сервисная книжка "Мой Силант"</p>
                </div>


                <div className="SingIn-container">
                    <div className={menuActive? "Burger-container active":"Burger-container"}>
                        <div className={!Status.length ? "SingIn" : "SingIn active"}>
                            <p>Логин:</p>
                            <input
                                className='login'
                                onChange={(e: any) => setLogin(e.target.value)}
                            />
                            <p>Пароль:</p>
                            <input
                                className='login'
                                type='password'
                                onChange={(e: any) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <div className="SingIn_btn">
                                <button
                                    className='singIn-button'
                                    onClick={handleClickSingIn}>
                                    Войти
                                </button>
                                <p style={{
                                    position: 'absolute',
                                    fontSize: '12px',
                                    color: 'red',
                                    transform: 'translate(-15px, 30px)'}}>
                                    {validLogin}
                                </p>
                            </div>
                        </div>
                        <div className={Status.length ? "SingOut" : "SingOut active"}>
                            <div className="SingIn_btn">
                                <p>Ваш статус:</p>
                                <p style={Status === 'Manager' ? {
                                    color: '#ffdb7f',
                                    backgroundColor: '#5fa2c5',
                                    fontSize: '21px'}:
                                    {color: '#120d0f',
                                    backgroundColor: '#83d3b4',
                                    fontSize: '19px'}}>
                                    {Status}
                                </p>
                                <button
                                    style={{width: '130px', height: '30px'}}
                                    onClick={handleClickSingOut}>Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className={menuActive ? 'burger-btn' : 'burger-btn active'}
                            onClick={change_btn}>
                        <span></span><span></span><span></span>
                    </button>
                    <button
                        className={menuActive ? 'burger-btn2' : 'burger-btn2 active'}
                        onClick={change_btn}>x
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Header;