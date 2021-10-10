import _ from 'lodash';
import React,{Fragment} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import {history} from './../../../../App';
import logoBlack from './../../../../imgRap/LOGO/Logo11.png';
import {UserOutlined} from '@ant-design/icons';
import './Header.css';

export default function Header(props) {
    const {userLogin} = useSelector(state=>state.QuanLyNguoiDungReducer)
    const renderLogin =()=>{
        if(_.isEmpty(userLogin)){
            return <Fragment>
                <button onClick={()=>{
                        history.push('/login')
                    }} className="self-center px-8 py-3 rounded">Sign in</button>
                    <button onClick={()=>{
                        history.push('/login')
                    }} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Sign up</button>
            </Fragment>
        }
        return <Fragment> <button onClick={()=>{
            history.push('/profile')
        }} className="self-center px-8 py-3 rounded"><UserOutlined style={{ fontSize: '20px'}}/> {userLogin.taiKhoan}</button>

        <button onClick={()=>{
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="self-center px-8 py-3 rounded">Đăng xuất</button></Fragment>
        
        
    }
    return (
        <header id="myP" style={{position:'fixed'}} className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-opacity-0 bg-black text-black fixed w-screen z-10 ">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex justify-center items-center div-logo">
                <NavLink to='/' aria-label="Back to homepage" className="flex items-center py-2 pr-2">
                    <img className="logo" src={logoBlack}  alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex pt-1 ">
                    <li className="flex ">
                        <NavLink to="/home" href="#" className="flex items-center -mb-1 border-b-2 px-4 border-transparent text-violet-400 border-violet-400 text-black" activeClassName="border-b-1 border-black active-item">Home</NavLink>
                    </li>
                    <li className="flex ">
                        <NavLink to="/contact" href="#" className="flex items-center px-4 -mb-1 dark:border-transparent text-black" activeClassName="border-b-1 border-black active-item">Contact</NavLink>
                    </li>
                    <li className="flex ">
                        <NavLink to="/news" href="#" className="flex items-center px-4 -mb-1 dark:border-transparent text-black" activeClassName="border-b-1 border-black active-item">News</NavLink>
                    </li>
                    
                </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>


    )
}
