import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { typeProduct } from "../../interfaces";

const Cart:React.FC = () => {
    
    const [products, setProducts] = useState<typeProduct[]>([])
    const getStorageCart = localStorage.getItem('cart')
    const parseCart = getStorageCart ? JSON.parse(getStorageCart) : []
    const subTotal = products.reduce((acc, product) => acc + (product.price * product.quality), 0)

    useEffect(()=>{
        const fetchApi = async () => {
            try {
                const res = await axios.get(`https://api.escuelajs.co/api/v1/products`);
                if(res.statusText != "") {
                    const filteredProducts = res.data.filter((product: typeProduct) => {
                        return parseCart.find((q: typeProduct) => product.id === q.id)
                    });
                    const updatedProducts = filteredProducts.map((product: typeProduct) => {
                        const quality = parseCart.find((q: typeProduct) => q.id === product.id)?.quality;
                        return { ...product, quality };
                    });
                    setProducts(updatedProducts)
                }
            } catch(err) {
                console.log(err)
            }
        }
        fetchApi();
    },[])

    const handleRemove = (id:number) => {
        setProducts((prev) => {
            const updatedProducts = prev.filter((item) => item.id !== id)
            const localData = updatedProducts.map((item) => {
                return {
                    id: item.id,
                    quality: item.quality
                }
            })
            localStorage.setItem('cart', JSON.stringify(localData))
            return updatedProducts
        })
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-3">
                <h1 className="text-2xl mb-10 font-bold text-[#ce0019]">Shopping Cart</h1>
                {products.length > 0 ? (
                    <div className="flex items-start justify-between gap-16">
                    <ul className="w-[65%] -my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={product.images[0]}  alt={product.title} className="size-full object-cover" />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <a href="">{product.title}</a>
                                            </h3>
                                            <p className="ml-4 text-[#ce0019]">{product.price}$</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {product.quality}</p>
                                        <div className="flex">
                                            <button
                                                onClick={() => handleRemove(product.id)}
                                                type="button" 
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="w-[35%] px-6 py-6 sm:px-6 bg-[#f7f7f7] rounded-md">
                        <h3 className="text-lg mb-2">Order Summary</h3>
                            <div className="divide-y divide-[#e4e4e4]">
                            <div className="flex justify-between text-base font-medium text-gray-900 py-3">
                                <p>Subtotal</p>
                                <p>${subTotal}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900 py-3">
                                <p>Shipping estimate</p>
                                <p>$5.00</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900 py-3">
                                <p>Tax estimate</p>
                                <p>$10.00</p>
                            </div>
                            <div className="flex justify-between text-lg text-gray-900 py-3">
                                <p>Order total</p>
                                <p>${subTotal + 5.00 + 10.00}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-[#ce0019] px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-75"
                            >
                            Checkout
                            </a>
                        </div>
                    </div>
                </div>
                ) : (
                    <p>Cart empty</p>
                )}
            </main>
            <Footer />
        </>
     );
}

export default Cart;