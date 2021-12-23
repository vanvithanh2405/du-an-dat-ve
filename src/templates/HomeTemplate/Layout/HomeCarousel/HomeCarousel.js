import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/acitons/CarouselAction';
import img1 from './../../../../imgRap/POSTER/POSTER 1.JPG';
import img2 from './../../../../imgRap/POSTER/POSTER 2.JPG';
import img3 from './../../../../imgRap/POSTER/POSTER 3.JPG';
import img4 from './../../../../imgRap/POSTER/POSTER 4.JPG';
import imgMB1 from './../../../../imgRap/POSTER/PosterMB-1.JPG';
import imgMB2 from './../../../../imgRap/POSTER/PosterMB-2.JPG';
import imgMB3 from './../../../../imgRap/POSTER/PosterMB-3.JPG';
import imgMB4 from './../../../../imgRap/POSTER/PosterMB-4.JPG';

// Css
import './HomeCarousel.css'

export default function HomeCarousel(props) {

    // const { arrImg } = useSelector(state => state.CarouselReducer);

    const dispatch = useDispatch();


    // sẽ tự kích hoạt khi component load ra
    useEffect(() => {
        //1 action = {type:'',data}
        //2 (phải cài middleware): callbackFunction (dispatch)

        const action = getCarouselAction()
        dispatch(action);
    }, [dispatch]);


    const contentStyle = {
        height: "600px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };


    // constructor(props) {
    //     super(props);
    //     this.next = this.next.bind(this);
    //     this.previous = this.previous.bind(this);
    //     this.carousel = React.createRef();
    //   }
    //   next() {
    //     this.carousel.next();
    //   }
    //   previous() {
    //     this.carousel.prev();
    //   }

    // const renderImg = () => {
    //     return arrImg.map((item, index) => {
    //         return <div key={index}>
    //             <div style={{...contentStyle}}>
    //                 <img src={item.hinhAnh} className="opacity-1 w-full h-full" alt={item.hinhAnh} />
    //             </div>
    //         </div>
    //     })
    // }


    return (

        <Carousel autoplay style={{ width: '100%', padding: 0, margin: 0 }} effect="fade" >
            {/* {renderImg()} */}
            {/* {SampleNextArrow()} */}
            <div style={{ contentStyle }}>
                <img src={img1} className="imgPoster opacity-1 w-full h-full" alt={img1} />
                <img src={imgMB1} className="imgMBPoster opacity-1 w-full h-full" alt={img1} />
                <div className="infoPoster">
                    <h1 className="tenPhim4">IT <br /> Chú hề ma quái</h1>
                    <h4>18/10/2021</h4>
                    <div className="moTa">
                        <p className="font-semibold text-lg">Là một bộ phim kinh dị siêu nhiên Mỹ ra mắt năm 2017 của đạo diễn Andy Muschietti. Đây là phần đầu tiên trong kế hoạch sản xuất loạt phim It hai phần dựa trên cuốn tiểu thuyết cùng tên của nhà văn Stephen King. Nhóm biên kịch của phim gồm có Chase Palmer, Cary Fukunaga và Gary Dauberman. </p>
                    </div>
                </div>
            </div>
            <div style={{ contentStyle }}>
                <img src={img2} className="imgPoster opacity-1 w-full h-full" alt={img2} />
                <img src={imgMB2} className="imgMBPoster opacity-1 w-full h-full" alt={img2} />
                <div className="infoPoster">
                    <h1 className="tenPhim1">AquaMan</h1>
                    <h4>31/10/2021</h4>
                    <div className="moTa ">
                        <p className="font-semibold text-lg">Phim điện ảnh siêu anh hùng của Mỹ dựa trên nhân vật Aquaman của DC Comics. Đây là phim thứ sáu của DC Extended Universe, do James Wan đảm nhiệm vai trò đạo diễn, David Leslie Johnson-McGoldrick và Will Beall thực hiện phần kịch bản từ phần cốt truyện của Wan, Beall và Geoff Johns. </p>
                    </div>
                </div>

            </div>
            <div style={{ contentStyle }}>
                <img src={img3} className="imgPoster opacity-1 w-full h-full" alt={img3} />
                <img src={imgMB3} className="imgMBPoster opacity-1 w-full h-full" alt={img3} />
                <div className="infoPoster">
                    <h1 className="tenPhim2 bg-gradient-to-r from-gray-200 to-blue-300">Frozen</h1>
                    <h4>11/11/2021</h4>
                    <div className="moTa">
                        <p className="font-semibold text-lg">Là phim điện ảnh nhạc kịch kỳ ảo sử dụng công nghệ hoạt hình máy tính của Mỹ do Walt Disney Animation Studios sản xuất và Walt Disney Pictures phát hành vào năm 2013.[5] Đây là bộ phim hoạt hình chiếu rạp thứ 53 trong series Walt Disney Animated Classics. </p>
                    </div>
                </div>

            </div>
            <div style={{ contentStyle }}>
                <img src={img4} className="imgPoster opacity-1 w-full h-full" alt={img4} />
                <img src={imgMB4} className="imgMBPoster opacity-1 w-full h-full" alt={img4} />
                <div className="infoPoster">
                    <h1 className="tenPhim3">Avengers <br /> Infinity War</h1>
                    <h4>20/11/2021</h4>
                    <div className="moTa">
                        <p className="font-semibold text-lg">Sau khi lấy được Viên đá Sức mạnh, một trong sáu Viên đá Vô cực từ hành tinh Xandar, Thanos cùng các con nuôi - Ebony Maw, Cull Obsidian, Proxima Midnight và Corvus Glaive - tấn công tàu Statesman đang chở theo những cư dân tị nạn Asgard, sát hại một nửa số người ở đây. </p>
                    </div>
                </div>

            </div>
            {/* {SamplePrevArrow()} */}
        </Carousel>

    )
}
// style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}

