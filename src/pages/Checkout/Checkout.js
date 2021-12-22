/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatVeAction, LayChiTietPhongVeAction } from '../../redux/acitons/QuanLyDatVeAction';
import { CHANGE_TAB_ACTIVE, DAT_VE } from './../../redux/types/QuanLyDatVeType'
import { ThongTinDatVe } from './../../_core/models/ThongTinDatVe'
// Css
import checkoutStyle from './Checkout.module.css';
import './Checkout.css'
// Antd
import { CheckOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import Swal from 'sweetalert2';
import moment from 'moment';
import { layThongTinDatVeAction } from '../../redux/acitons/QuanLyNguoiDungAction';
import { Tabs } from 'antd';
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd';

const { TabPane } = Tabs;

function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);


    const dispatch = useDispatch();

    useEffect(() => {
        // Gọi hàm tạo ra một async function
        const action = LayChiTietPhongVeAction(props.match.params.id);
        // sau đó dispatch function này đi 
        dispatch(action);
    }, [])

    const clickTicket = () => {
        Swal.fire({
            icon: 'success',
            title: 'ĐẶT VÉ THÀNH CÔNG',
            confirmButtonText: 'Xác nhận',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                console.log('thongTinDatVe', thongTinDatVe);
                const action = DatVeAction(thongTinDatVe);
                dispatch(action);
            }
        })
    }
    


    const { thongTinPhim, danhSachGhe } = chiTietPhongVe

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';

            let classGheDangDat = '';

            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

            let classGheDaDuocDat = '';

            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }



            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center `} key={index}>
                    {classGheDangDat !== '' ? ghe.stt : <Fragment><span className="opacity-0">ghe</span></Fragment>}
                </button>


                {/* Chia một cột là 16 ghế  */}
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })


    }
    let classBtnDatVe = '';

    if (danhSachGheDangDat.length === 0) {
        classBtnDatVe = 'disabled';
    }

    return (
        <div className="container-fluid min-h-screen">
            <div className="grid grid-cols-12">
                <div className="col-span-9 layout_Rap">
                    <div className="flex flex-col items-center mt-5">

                        <div className="bg-black" style={{ width: '80%', height: 15 }}>
                        </div>
                        <div className={`${checkoutStyle['trapezoid']}`}>
                            <h3 className="mt-3 text-center">Màn hình</h3>
                        </div>
                    
                        <div className="mt-8">
                            {renderSeats()}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <table className=" divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5 text-center ">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="text-center">
                                    <td><button className="ghe"></button></td>
                                    <td><button className="ghe gheDangDat"></button></td>
                                    <td><button className="ghe gheVip"></button></td>
                                    <td><button className="ghe gheDaDat"></button></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="col-span-3 relative min-h-screen pt-5">
                    <h3 className="text-green-400 text-center text-4xl">{danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                        return tongTien += gheDangDat.giaVe;
                    }, 0).toLocaleString()}đ</h3>

                    <hr />

                    <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p>Ngày Chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>

                    <hr />
                    <div className="scroll__bar__custom pt-2" style={{ overflow: 'auto', height: 300, }}>
                        <table className="table-fixed w-full text-center">
                            <thead>
                                <tr className="" style={{ fontSize: 20 }}>
                                    <th className="w-1/3 text-red-400 text-lg">Số ghế</th>
                                    <th className="w-1/3 text-red-400 text-lg">Loại ghế</th>
                                    <th className="w-1/2 text-green-400 text-lg">Giá vé</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {_.sortBy(danhSachGheDangDat, ['maGhe', 'loaiGhe']).map((gheDangDat, index) => {
                                    return <tr key={index}>
                                        <td className="text-lg font-medium">[{gheDangDat.tenGhe}]</td>
                                        <td className="text-lg font-medium">{gheDangDat.loaiGhe}</td>
                                        <td className="text-lg font-medium">{gheDangDat.giaVe.toLocaleString()}VND</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h5 className="pt-3 text-xl text-center">THÔNG TIN NGƯỜI ĐẶT</h5>

                    <div className="text-lg my-3">
                        <i className="font-medium">Email: </i>
                        {userLogin.email}
                        {/* {userLogin.email.length > 15 ? userLogin.email.substr(0, 15) + '...' : userLogin.email} */}

                    </div>
                    <div className="text-lg my-3">
                        <i className="font-medium">Phone: </i>
                        {userLogin.soDT}
                        {/* {userLogin.soDT.length > 15 ? userLogin.soDT.substr(0, 15) + '...' : userLogin.soDT} */}


                    </div>
                    <hr />
                    
                    <div className={`${classBtnDatVe} mb-0 h-full flex flex-col items-center`} style={{ marginBottom: 0 }} >
                        <div onClick={() => {
                            clickTicket();
                        }} className="bg-gray-600 hover:bg-gray-800 text-white w-full text-center py-3 font-semibold text-lg cursor-pointer">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default function (props) {
    
    const dispatch = useDispatch();

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);


    useEffect(() => {
        return () => {
            dispatch({ type: CHANGE_TAB_ACTIVE, number: '1' })
        }
    }, [])

    //menu for dropdown antd
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile">Thông Tin Cá Nhân</Link>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/');
                    window.location.reload();
                }}>
                    Đăng Xuất
                </div>
            </Menu.Item>
        </Menu>
    );

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            {userLogin.taiKhoan}
            <Dropdown overlay={menu} placement="bottomCenter" className="text-center" arrow>
                <button className="pr-7" onClick={() => {
                    history.push(`/profile`);
                }}><UserProfile className="ml-5 rounded-full bg-blue-100">{userLogin.taiKhoan.substr(0, 1)}</UserProfile></button>
            </Dropdown>
        </Fragment> : ''}
    </Fragment>;
    
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    console.log('tabActive', tabActive)
    return <div className="p-5">
        <Tabs tabBarExtraContent={operations}  defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
            dispatch({ type: CHANGE_TAB_ACTIVE, number: key })
        }}>
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1" >
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane style={{}} tab={<NavLink to="/" className="text-black">TRANG CHỦ</NavLink>}>
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
}

function KetQuaDatVe(props) {

    const dispatch = useDispatch();

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        const action = layThongTinDatVeAction();
        dispatch(action)
    }, [])

    console.log('thongTinNguoiDung', thongTinNguoiDung)

    const renderTicketItem = () => {

        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe)
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full text-base" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium tenPhim">{ticket.tenPhim}</h2>
                        <span className="diaDiem">{seats.tenHeThongRap} / {seats.tenRap}</span>
                        <p className="text-gray-500 gioChieu">{moment(ticket.ngayDat).format('DD-MM-YYYY')} / {moment(ticket.ngayDat).format('HH:MM')}  </p>
                        <p className="text-gray-500">Tên Rạp: {seats.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => {
                            return <span key={index}> [{ghe.tenGhe}] </span>
                        })}</p>
                    </div>
                </div>
            </div>
        })
    }

    return <section className="text-gray-600 body-font">
        <div className="container px-2 py-2 mx-auto">
            <div className="flex flex-wrap -m-2">
                {renderTicketItem()}
            </div>
        </div>
    </section>

}
const UserProfile = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
