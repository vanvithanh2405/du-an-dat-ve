/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from 'react'
import { Tabs, Radio, Space, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { history } from '../../../App';
import { USER_LOGIN } from '../../../util/settings/config';
import moment from 'moment';
import './HomeMenu.scss';
import { Collapse, Select } from 'antd';

const { TabPane } = Tabs;
const { Panel } = Collapse;




export default function HomeMenu(props) {
    const { heThongRapChieu } = props;
    const [state] = useState({
        tabPosition: "left",
    });

    const clickMovie = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng Ý!'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/login');
            }
        })
    }

    const { tabPosition } = state;

    const renderHeThongRap = () => {
        return props.heThongRapChieu.map((heThongRap, index) => {
            // Load ra logo rạp 
            return <TabPane tab={<img src={heThongRap.logo} className="rounded-full mainMaxWidth" width="50" />} key={index}>
                {/* Load ra hệ thống cụm rạp  */}
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap.slice(0, 6).map((cumRap, index) => {
                        return <TabPane tab={
                            <div style={{ width: '400px' }} className="flex align-middle justify-items-center ">
                                <img src={cumRap.hinhAnh} style={{ width: 60, height: 60 }} />
                                <div className="text-left ml-2 font-semibold">
                                    {cumRap.tenCumRap}
                                    <div className="text-s font-normal ">
                                        {cumRap.diaChi.length > 40 ? <span>{cumRap.diaChi.slice(0, 40)} ...</span> : <span>{cumRap.diaChi}</span>}
                                    </div>
                                    <div className="text-red-500 text-s font-medium">
                                        [Chi tiết]
                                    </div>
                                </div>
                            </div>
                        }
                            className="tab-scroll-bar pr-0" key={index}>
                            {/* Load phim tương ứng  */}
                            {cumRap.danhSachPhim.map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="my-auto">
                                        <div style={{ display: 'flex' }} className="mt-4 ">
                                            <img style={{ height: 120, width: 90 }} src={phim.hinhAnh} alt={phim.hinhAnh} />
                                            <div className="ml-10">
                                                <h2 className=" text-2xl font-semibold ">{phim.tenPhim}</h2>
                                                <p className="text-xs font-base">120 phút - 8.0 IMDb - 2D/Digital</p>
                                                <div className="grid grid-cols-5 gap-3">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 10).map((lichChieu, index) => {
                                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            <button className="bg-gray-300 hover:bg-gray-500 text-gray-500 hover:text-white font-semibold py-2 px-2 rounded-lg">{moment(lichChieu.ngayChieuGioChieu).format('HH:MM')}</button>
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    };

    const createRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const renderHeThongRapMobile = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <Collapse expandIconPosition="right" key={index}>
                <Panel header={<div className="titleCinemaMobile">
                    <img className="logoCinemasMobile" src={heThongRap.logo} />
                    <div className="nameCinemasMobile">{heThongRap.maHeThongRap}</div>
                </div>} key={index} >
                    <Collapse
                        expandIconPosition="right"
                        className="cinemaChildMobile"
                    >
                        {
                            heThongRap?.lstCumRap.map((lcd, indexs) => {
                                return <Panel header={<div className="titleCinemasChildMobile">
                                    <img className="logoCinemasChildMobile" src={heThongRap.logo} />
                                    <div className="infoCinemasChildMobile">
                                        <div className="nameCinemasChildMobile">{lcd.tenCumRap}</div>
                                        <div className="addCinemasChildMobile">{lcd.diaChi}</div>
                                    </div>
                                </div>} key={indexs}>
                                    <Collapse
                                        expandIconPosition="right"
                                        className="filmMobile"
                                    >
                                        {lcd.danhSachPhim.map((dsp, indexsss) => {
                                            return <Panel showArrow={false} header={<div className="infoFilmCinemaMobile">
                                                <img className="imgFilmMobile" src={dsp.hinhAnh} />
                                                <div className="infoFilmMobileDetail">
                                                    <span className="typeAgeMobile">C{createRandomNumber(18, 12)}</span>
                                                    <span className="nameFilmCinemaMobile">
                                                        {dsp.tenPhim}
                                                    </span>
                                                    <div className="timeReviewFilmMobile">
                                                        {createRandomNumber(120, 90)} phút - {createRandomNumber(9.7, 3.4).toFixed(1)} IMDb
                                                    </div>
                                                </div>
                                            </div>} key={indexsss}>
                                                <div className="ml-2" style={{ fontWeight: '600', paddingBottom: 15 }}>{createRandomNumber(3, 2)}D Digital</div>

                                                <div key={indexsss + 300} className="flex flex-wrap">
                                                    {dsp.lstLichChieuTheoPhim.map((ds, indexssss) => {
                                                        if (indexssss <= 6) {
                                                            if (localStorage.getItem(USER_LOGIN)) {
                                                                return <NavLink className="movieTime" to={`/checkout/${ds.maLichChieu}`} key={index}>
                                                                    {moment(ds.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            } else {
                                                                return <a onClick={clickMovie} className="movieTime" key={index}>
                                                                    {moment(ds.ngayChieuGioChieu).format('hh:mm A')}
                                                                </a>
                                                            }
                                                        }
                                                    })}
                                                </div>
                                            </Panel>
                                        })}
                                    </Collapse>
                                </Panel>
                            })
                        }
                    </Collapse>
                </Panel>
            </Collapse>
        })
    }





    return (
        <>
            <div className="movie__listCinemas">
                <Row className="hideOnMobile">
                    <Col span={24}>
                        <Tabs tabPosition={tabPosition}>{renderHeThongRap()};</Tabs>
                    </Col>
                </Row>
                <Row className="listCinemasMobile hideOnPC">
                    <Col span={24}>
                        <div>{renderHeThongRapMobile()}</div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
