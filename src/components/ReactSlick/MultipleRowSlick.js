import React, {useState } from "react";
import { useDispatch } from 'react-redux'
// import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
// import FilmFlip from "../Film/FilmFlip/FilmFlip";

// Css MultipleRowSlick
import styleSlick from './MultipleRowSlick.module.css';
import './MultipleRowSlick.css';
import Film from "../Film/Film";



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-next']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}



function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}


const MultipleRows = (props) => {


  const [phimDangChieu, setPhimDangChieu] = useState(true);
  const [phimSapChieu, setPhimSapChieu] = useState(false);

  // const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch();

  const renderFilm = () => {
    return props.arrFilm.slice(0,16).map((item, index) => {
      return <div className="mt-2" key={index}>
        {/* <FilmFlip item={item} /> */}
        <Film item={item}/>
        
      </div>
    })
  }

  // let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

  // let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';


  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="text-left backgroundFilm">
      <button type="button" className= {phimDangChieu ? `active_Film` : `none_active_Film`} onClick={() => {
        const action = { type: SET_FILM_DANG_CHIEU }
        dispatch(action);
        setPhimDangChieu(true);
        setPhimSapChieu(false);
      }}>Phim Đang Chiếu</button>
      <button type="button" className={!phimSapChieu ? `none_active_Film` : `active_Film`} onClick={() => {
        const action = { type: SET_FILM_SAP_CHIEU }
        dispatch(action);
        setPhimSapChieu(true);
        setPhimDangChieu(false);
      }}>Phim Sắp Chiếu</button>
      <Slider {...settings}>
        {renderFilm()}
      </Slider>
    </div>
  );
}


export default MultipleRows;