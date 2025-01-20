import { Link } from "react-router";

function Header() {
    return ( 
        <header className="mb-10 py-5 border-b border-solid border-[#e5e5e5]">
            <div className="container px-3 mx-auto flex justify-between items-center gap-x-6">
                <h1 className="text-2xl font-bold text-[#ce0019] hover:opacity-75"><Link to="/">FASHION</Link></h1>
                <ul className="flex justify-between items-center gap-x-5 font-medium">
                    <li><Link to="/category" className="hover:opacity-70">Category</Link></li>
                    <li><Link to="/products" className="hover:opacity-70">Products</Link></li>
                    <li><Link to="/news" className="hover:opacity-70">News</Link></li>
                    <li><Link to="/cart" className="hover:opacity-70">Cart</Link></li>
                    <li><Link to="/login" className="hover:opacity-70">Login</Link></li>
                </ul>
            </div>
        </header> 
    );
}

export default Header;