/* eslint-disable jsx-a11y/alt-text */
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { SendOutlined, FacebookFilled, InstagramFilled, YoutubeFilled, TwitterSquareFilled } from '@ant-design/icons';
import logoWhite from './../../../../imgRap/LOGO/LogoR2-mini.png'
import bg from '../../../../assets/img/footer-bg.67e95f05.jpg';
import logo from '../../../../imgRap/LOGO/LogoR22.png';
import './Footer.scss'
import { Link } from 'react-router-dom';
export default function Footer() {

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));

    console.log('arrHeThongRap', arrHeThongRap)


    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content " style={{ margin: 'auto' }}>
                <div className="footer__content__logo">
                    <div className="logo">
                        <img className='mr-5' src={logo} alt="" />
                        <Link to="/">RẠP</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Trang Chủ</Link>
                        <Link to="/">Dịch Vụ</Link>
                        <Link to="/">Thông Tin</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Thỏa Thuận Sử Dụng</Link>
                        <Link to="/">Quy Chế Hoạt Động</Link>
                        <Link to="/">Quyền Lợi Thành Viên</Link>
                        <Link to="/">Chính Sách Bảo Mật</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">FAQ</Link>
                        <Link to="/">Brand Guidelines</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Liên hệ với chúng tôi</Link>
                        <div className="social-icons">
                            <div className="social-icon social-icon--codepen">
                                <i className="fab fa-codepen" />
                                <div className="tooltip">Codepen</div>
                            </div>
                            <div  className="social-icon social-icon--github">
                                <i className="fab fa-github" />
                                <div className="tooltip">GitHub</div>
                            </div>
                            <div className="social-icon social-icon--twitter">
                                <i className="fab fa-twitter" />
                                <div className="tooltip">Twitter</div>
                            </div>
                            <div className="social-icon social-icon--youtube">
                                <i className="fab fa-youtube" />
                                <div className="tooltip">Youtube</div>
                            </div>
                            <div className="social-icon social-icon--instagram">
                                <i className="fab fa-instagram" />
                                <div className="tooltip">Instagram</div>
                            </div>
                            <div className="social-icon social-icon--facebook">
                                <i className="fab fa-facebook" />
                                <div className="tooltip">Facebook</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
