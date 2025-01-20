function Footer() {
    return ( 
        <>
            <section className="text-center mt-20 py-10 px-3 bg-[#EFEFF4]">
                <div className="container mx-auto">
                    <h2 className="font-bold text-3xl mb-2">Subscribe to Newsletter</h2>
                    <p className="text-sm mb-7">Sign up for our newsletter to stay updated with the latest designs.</p>
                    <div className="flex justify-center">
                        <input className="w-full max-w-[500px] text-sm py-3 px-4 border-solid border border-[#C8C7CC] outline-none" placeholder="Please enter your email..."/>
                        <button className="bg-[#000] text-[#fff] text-sm font-bold px-9 hover:opacity-75">SUBMIT</button>
                    </div>
                </div>
            </section>
            <footer className="border-t border-solid bg-[#070707]">
                <div className="container px-3 py-8 mx-auto text-[#fff]">
                    <div className="flex flex-wrap justify-between gap-5 text-sm">
                        <div className="w-[350px]">
                            <strong className="block text-lg mb-2">FASHION</strong>
                            <p className="mb-1">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                            </p>
                            <p className="mb-1">
                            Lorem Ipsum is simply dummy text. 
                            </p>
                        </div>
                        <ul>
                            <li><a href="/">Introduction</a></li>
                            <li><a href="/">Business Philosophy at NEM Fashion</a></li>
                            <li><a href="/">NEM's Blog</a></li>
                            <li><a href="/">Showroom System</a></li>
                            <li><a href="/">Contact</a></li>
                        </ul>
                        <ul>
                            <li><a href="/">Delivery - Shipping Policy</a></li>
                            <li><a href="/">Payment Guide</a></li>
                            <li><a href="/">Order Tracking</a></li>
                            <li><a href="/">Size Guide</a></li>
                            <li><a href="/">Exchange Policy</a></li>
                            <li><a href="/">Warranty and Repair Policy</a></li>
                            <li><a href="/">Loyalty Program</a></li>
                            <li><a href="/">Product Care Guide</a></li>
                        </ul>
                        <div>
                            <p className="mb-2">Payment Methods</p>
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