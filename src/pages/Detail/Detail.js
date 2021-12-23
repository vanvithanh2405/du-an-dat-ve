/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import { Rate } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circlePercent.scss'
import './Detail.scss'
// Tabs
import { Tabs } from 'antd';
import { layThongTinChiTietPhim } from '../../redux/acitons/QuanLyRapAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'antd';
import Swal from 'sweetalert2';
import { history } from '../../App';
import { USER_LOGIN } from '../../util/settings/config';



const { TabPane } = Tabs;
export default function Detail(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
    console.log()
    console.log({ filmDetail })
    const dispatch = useDispatch()
    useEffect(() => {
        // lấy thông tin param từ url
        let { id } = props.match.params;

        dispatch(layThongTinChiTietPhim(id))

    }, [dispatch])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const getId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
    const convertLink = (url) => {
        return `https://www.youtube.com/embed/${getId(url)}`
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window
        return { width, height }
    }

    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

        useEffect(() => {
            const handleResize = () => setWindowDimensions(getWindowDimensions())

            window.addEventListener('resize', handleResize)

            return () => window.removeEventListener('resize', handleResize)

        }, [])

        return windowDimensions
    }
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
    const { width } = useWindowDimensions();
    return (
        <div className="" style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh', borderRadius: '0' }}
                effectColor="#0a2029" // required
                color="#14AEFF" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-6 col-start-3">
                        <div className="grid grid-cols-3">
                            <div onClick={() => showModal()}>
                                <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} className="col-span-1" />
                            </div>

                            <div className="col-span-2 flex flex-col justify-center ml-10">
                                <p className="text-white">Ngày Chiếu: {moment(filmDetail.ngayKhoiChieu).format('dd-mm-yyyy')}</p>
                                <p className="text-4xl text-white">{filmDetail.tenPhim}</p>
                                <p className="text-white text-lg">Mô tả: {filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 col-end-12 flex flex-col justify-center items-center">
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span classNam="text-white">{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar " />
                                <div className="fill " />
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="star-icon">
                                {/* <Rate style={{ color: '#ffe066 !important' }} allowHalf defaultValue={filmDetail.danhGia / 2} /> */}

                                <Rate disabled allowHalf defaultValue={filmDetail.danhGia / 2} />
                            </div>
                            <h3 className="text-xl text-red-500">{filmDetail.danhGia}/10 Đánh giá</h3>
                        </div>

                    </div>
                </div>

                <div className="mt-10 w-2/3 bg-white p-5 container" style={{ marginLeft: 310 }}>
                    <div>
                        <Tabs tabPosition={'left'}>
                            {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                                return <TabPane tab={<div className="flex items-center">
                                    <img src={heThongRap.logo} width={50} className="rounded-full" alt={heThongRap.tenHeThongRap} />
                                    <h3 className="ml-5">{heThongRap.tenHeThongRap}</h3>
                                </div>}
                                    key={index}>
                                    <div className="tab-scroll-bar">
                                        {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                            return <div className="mt-5" key={index}>
                                                <div className="flex">
                                                    <img className="rounded-md" src={cumRap.hinhAnh} alt={cumRap.tenCumRap} style={{ width: 50, height: 50 }} />

                                                    <div className="ml-2">
                                                        <p className="text-xl mb-2">{cumRap.tenCumRap}</p>
                                                        <p className="text-xs opacity-80">{cumRap.diaChi}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        if (localStorage.getItem(USER_LOGIN)) {
                                                            return <NavLink className="col-span-1 mt-3 mr-5 w-20 px-2 py-2 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('HH:MM')}
                                                            </NavLink>
                                                        } else {
                                                            return <span onClick={clickMovie} className="cursor-pointer col-span-1 mt-5 mr-5 w-20 px-2 py-3 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black" key={index}>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('HH:MM')}
                                                            </span>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </TabPane>
                            })}
                        </Tabs>
                    </div>
                </div>
            </CustomCard>

            <Modal visible={isModalVisible} centered
                style={{ width: (width / 100) }} footer onOk={handleOk} onCancel={handleCancel}>
                <iframe style={{ width: '100%' }} height="400px" src={convertLink(filmDetail?.trailer)}></iframe>
            </Modal>
        </div>
    )
}
