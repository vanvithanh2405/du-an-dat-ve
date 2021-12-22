import React from 'react';
import './News.scss'



export default function News() {
    return (
        <div className="container newsCss">
            <div className="newsTitle text-center">
                <h3 className="text-4xl">Tin tức</h3>
            </div>
            <div className="newsItems flex mt-4">
                <div className="itemLeft">
                    <div className="topItemLeft flex items-center">
                        <div className="poster mr-4"></div>
                        <div className="content">
                            <div className="content_title text-2xl">
                                <h3 className="font-bold">[TIN TỨC] The Cojuring 3 Nỗi ám tận cùng</h3>
                            </div>
                            <div className="text text-lg">
                                <p>Trong khi các dòng phim khác vẫn đang phải vật lộn để tìm lại chỗ đứng sau mùa dịch Covid-19, thể loại kinh dị lại chứng minh được sức hút lớn với doanh thu ổn định, dường như không khác là bao so với thời hoàng kim trước đây.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bottomItemLeft flex mt-5 items-center">
                        <div className="poster mr-4"></div>
                        <div className="content">
                            <div className="content_title text-2xl">
                                <h3 className="font-bold" >[TIN TỨC] Bàn tay diệt quỷ khi anh trai quốc dân hóa thành linh mục trừ tà</h3>
                            </div>
                            <div className="text text-lg">
                                <p>
                                   Sau nhiều thành công ở địa hạt truyền hình, nam tài tử Park Seo Joon đến với màn ảnh rộng cùng bộ phim giật gân, kinh dị mang tên Bàn Tay Diệt Quỷ (The Divine Fury). Vốn dĩ phim đã ra mắt từ năm 2019, nhưng đến giờ mới được chiếu ở Việt Nam. </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="itemRight">
                    <div className="topItemRight flex items-center">
                        <div className="poster mr-4"></div>
                        <div className="content">
                            <div className="content_title text-2xl">
                                <h3 className="font-bold">[TIN TỨC] Cùng phiêu lưu cùng chú ngựa Spirit</h3>
                            </div>
                            <div className="text text-lg ">
                                <p>Thoạt nhìn thật khó tin khi Kena: Bridge of Spirits lại là sản phẩm đầu tay của một studio nhỏ vốn không có nhiều kinh nghiệm trong việc sản xuất các trò chơi điện tử. Về cơ bản thì Ember Lab được thành lập vào năm 2009 bởi anh em Mike và Josh Grier. </p>
                            </div>
                        </div>
                    </div>

                    <div className="bottomItemRight flex mt-5 items-center">
                        <div className="poster mr-4"></div>
                        <div className="content">
                            <div className="content_title text-2xl">
                                <h3 className="font-bold">[TIN TỨC] Cruella những bộ cánh khiến dân tình mê mẫn</h3>
                            </div>
                            <div className="text text-lg">
                                <p>Không chỉ là nội dung hay diễn xuất, thời trang và nhan sắc vẫn luôn là một yếu tố làm nên thành công của phim điện ảnh. Rất nhiều bộ phim Hollywood đã trở thành huyền thoại nhờ khoản trang phục quá xuất sắc.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
