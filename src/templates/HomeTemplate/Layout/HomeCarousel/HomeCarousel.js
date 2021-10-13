import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/acitons/CarouselAction';
import img1 from './../../../../imgRap/POSTER/POSTER 1.JPG';
import img2 from './../../../../imgRap/POSTER/POSTER 2.JPG';
import img3 from './../../../../imgRap/POSTER/POSTER 3.JPG';
import img4 from './../../../../imgRap/POSTER/POSTER 4.JPG';

// Css
import './HomeCarousel.css'

export default function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer);

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
           <div style={{contentStyle}}>
                    <img src={img1} className="opacity-1 w-full h-full" alt={img1} />                    
            </div>
            <div style={{contentStyle}}>
                    <img src={img2} className="opacity-1 w-full h-full" alt={img2} />
            </div>
            <div style={{contentStyle}}>
                    <img src={img3} className="opacity-1 w-full h-full"alt={img3} />
            </div>
            <div style={{contentStyle}}>
                    <img src={img4} className="opacity-1 w-full h-full" alt={img4} />
            </div>
            {/* {SamplePrevArrow()} */}
        </Carousel>

    )
}
// style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}

