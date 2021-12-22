/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction, dangKyAction } from './../../redux/acitons/QuanLyNguoiDungAction';
import * as yup from 'yup';
import './LoginAnimation.css'
import { GROUP_ID } from '../../util/settings/config';

import logoW from './../../imgRap/LOGO/LogoR22.png'

export default function Login(props) {

  const dispatch = useDispatch()
  //login
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log('userLogin', userLogin)
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {

      const action = dangNhapAction(values);
      dispatch(action);


      console.log('values', values)
    },
  });
  const [formType, setFormType] = useState('login')

  const hanldeChangeForm = (type) => {
    setFormType(type);
  }

  //signUp
  const { errors } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log('errorsScreen', errors)

  const formikDangKy = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP_ID,
      hoTen: ""
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required("* Tài khoản không được để trống"),
      matKhau: yup.string().required("* Mật khẩu không được để trống").min(6, "Mặt khẩu tối thiểu 6 ký tự").max(30, "Mặt khẩu tối đa 30 ký tự"),
      hoTen: yup.string().required("* Họ tên không được để trống"),
      email: yup.string().required("* Email không được để trống").email("* Định dạng email phù hợp"),
      soDt: yup.string().required("* Số điện thoại không được để trống").matches(/^[0-9]+$/).min(6, "Số điện thoại tối thiểu 6 ký tự").max(20, "Số điện thoại tối đa 20 ký tự"),
    }),
    onSubmit: values => {
      values.maNhom = GROUP_ID;
      const action = dangKyAction(values);
      dispatch(action);
      console.log('values: ', values);
    },

  })

  return (
    <section className="forms-section w-full">
      <Link to="/">
        <img className="logoLogin" src={logoW} alt="logo" />
      </Link>
      <div className="forms pt-20">
        <div className={`form-wrapper ${formType === 'login' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-login" onClick={() => hanldeChangeForm('login')}>
            Đăng nhập
            <span className="underline" />
          </button>
          <form className="form form-login"
            onSubmit={(event) => {
              event.preventDefault();
              formik.handleSubmit(event);
            }} >
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">Tài khoản</label>
                <input id="login-email" type="text" name="taiKhoan" onChange={formik.handleChange} placeholder="Nhập vào tài khoản" required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name="matKhau" onChange={formik.handleChange} placeholder="Nhập vào mật khẩu" required />
              </div>
            </fieldset>
            <button type="submit" className="btn-login">Đăng nhập</button>
          </form>
        </div>
        <div className={`form-wrapper ${formType === 'signup' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-signup" onClick={() => hanldeChangeForm('signup')}>
            Đăng ký
            <span className="underline" />
          </button>

          <form className="form form-signup" onSubmit={formikDangKy.handleSubmit}>
            <fieldset>
              <legend>Đăng ký bằng cách điền thông tin cá nhân theo yêu cầu.</legend>
              <div className="form-group">
                <label>Tài khoản{formikDangKy.errors.taiKhoan && formikDangKy.touched.taiKhoan ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.taiKhoan} </span>) : null}</label>
                <input name="taiKhoan" type="text" className="form-control" onChange={formikDangKy.handleChange} />

              </div>
              <div className="form-group">
                <label>Mật khẩu{formikDangKy.errors.matKhau && formikDangKy.touched.matKhau ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.matKhau} </span>) : null}</label>
                <input name="matKhau" type="password" className="form-control" onChange={formikDangKy.handleChange} />

              </div>
              <div className="form-group">
                <label>Họ tên{formikDangKy.errors.hoTen && formikDangKy.touched.hoTen ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.hoTen} </span>) : null}</label>
                <input name="hoTen" type="text" className="form-control" onChange={formikDangKy.handleChange} />

              </div>
              <div className="form-group">
                <label>Email{formikDangKy.errors.email && formikDangKy.touched.email ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.email} </span>) : null}</label>
                <input name="email" type="text" className="form-control" onChange={formikDangKy.handleChange} />


              </div>
              <div className="form-group">
                <label>Số điện thoại{formikDangKy.errors.soDt && formikDangKy.touched.soDt ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.soDt} </span>) : null}</label>
                <input name="soDt" type="text" className="form-control" onChange={formikDangKy.handleChange} />
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">Đăng ký</button>
          </form>
        </div>
      </div>
    </section>


  )
}
