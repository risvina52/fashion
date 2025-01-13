function Footer() {
    return ( 
        <>
            <section className="text-center mt-20 py-10 px-3 bg-[#EFEFF4]">
                <div className="container mx-auto">
                    <h2 className="font-bold text-3xl mb-2">Subscribe to Newsletter</h2>
                    <p className="text-sm mb-7">Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới nhất</p>
                    <div className="flex justify-center">
                        <input className="w-full max-w-[500px] text-sm py-3 px-4 border-solid border border-[#C8C7CC] outline-none" placeholder="Please enter your email..."/>
                        <button className="bg-[#000] text-[#fff] text-sm font-bold px-9 hover:opacity-75">SUBMIT</button>
                    </div>
                </div>
            </section>
            <footer className="border-t border-solid bg-[#070707]">
                <div className="container px-3 py-8 mx-auto text-[#fff]">
                    <div className="flex flex-wrap justify-between gap-5 text-sm">
                        <div className="">
                            <strong className="block mb-2">NEM FASHION - THỜI TRANG CÔNG SỞ</strong>
                            <p className="mb-1">
                                Công ty TNHH Dịch vụ và Thương mại An Thành.<br />
                                Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017<br />
                            </p>
                            <p className="mb-1">
                                Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ<br />
                                phường Bồ Đề, quận Long Biên, Hà Nội<br />
                                Chăm sóc khách hàng: 0246.2591551<br />
                                Mua hàng online: 0246.2909098
                            </p>
                            <p className="mb-1">
                                Email: nemcskh@stripe-vn.com
                            </p>
                        </div>
                        <ul>
                            <li><a href="/">Giới thiệu</a></li>
                            <li><a href="/">Triết lý kinh doanh tại NEM Fashion</a></li>
                            <li><a href="/">NEM's Blog</a></li>
                            <li><a href="/">Hệ thống showroom</a></li>
                            <li><a href="/">Liên hệ</a></li>
                        </ul>
                        <ul>
                            <li><a href="/">Chính sách giao nhận - Vận chuyển</a></li>
                            <li><a href="/">Hướng dẫn thanh toán</a></li>
                            <li><a href="/">Tra cứu đơn hàng</a></li>
                            <li><a href="/">Hướng dẫn chọn Size</a></li>
                            <li><a href="/">Quy định đổi hàng</a></li>
                            <li><a href="/">Quy định bảo hành và sửa chữa</a></li>
                            <li><a href="/">Khách hàng thân thiết</a></li>
                            <li><a href="/">Hướng dẫn bảo quản sản phẩm</a></li>
                        </ul>
                        <div>
                            <p className="mb-2">Phương thức thanh toán</p>
                            <img className="mb-2" src="https://theme.hstatic.net/200000182297/1000887316/14/image_method_3.png?v=1678" alt="" />
                            <img className="w-[118px]" src="https://theme.hstatic.net/200000182297/1000887316/14/bct.png?v=1678" alt="" />
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] py-2">
                    <p className="px-3 container mx-auto text-sm">© 2024 - Copyright Site</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;