import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams } from "react-router";
import { typeProduct } from "../../interfaces";
import Products from "../../components/products";

const Details:React.FC = () => {
    const { productId } = useParams()
    const productIdNumber = Number(productId)
    const [loading, setLoading] = useState<boolean>(true)
    const [releated, setReleated] = useState<typeProduct[]>([])
    const [success, setSuccess] = useState<boolean>(false)
    const [details, setDetails] = useState<typeProduct>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        images: '',
        creationAt: '',
        updatedAt: '',
        category : {
            id: 0,
            name: ''
        }
    })
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`https://api.escuelajs.co/api/v1/products`);
                if(res.statusText != "") {
                    const filterProducts = res.data.filter((product:typeProduct) => product.id === productIdNumber)
                    setDetails(filterProducts[0])
                    const categoryProducts = res.data.filter((cat:typeProduct) => cat.category.id === filterProducts[0].category.id)
                    const filterReleated = categoryProducts.filter((rel:typeProduct) => rel.id !== productIdNumber)
                    const limitReleated = filterReleated.splice(0,8)
                    setReleated(limitReleated)
                }
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchApi();
    },[])
    
    const handleAddtoCart = () => {
        const arrCart:number[] = []
        const getStorageCart = localStorage.getItem('cart')
        const parseCart: number[] = getStorageCart ? JSON.parse(getStorageCart) : []
        if(!getStorageCart) {
            arrCart.push(productIdNumber)
            localStorage.setItem('cart', JSON.stringify(arrCart))
        } else {
            if(!parseCart.includes(productIdNumber)) {
                parseCart.push(productIdNumber)
            }
            localStorage.setItem('cart', JSON.stringify(parseCart))
        }
        setSuccess(true)
    }

    return (
        <>
            <Header/>
            <main className="container mx-auto px-3">
                {!loading ? (
                    <>  
                        {success && (
                            <div className="px-5 py-4 bg-[#cbf7c5] rounded-md mb-8 text-sm text-[#175d0b] flex items-center justify-between gap-3">
                                “100 Days of Inspiration: 3 Generations of Wisdom (eBook PDF)” has been added to your cart.
                                <a href="/cart" className="px-5 py-2 bg-[#ce0019] text-white rounded-md hover:opacity-75">View Cart</a>
                            </div>
                        )}
                        <div className="flex gap-10">
                            <div className="w-[40%]">
                                <div className="aspect-square bg-[#ccc]">
                                    <img src={details.images[0]} alt={details.title} />
                                </div>
                            </div>
                            <div className="w-[60%]">
                                <span className="mb-2 inline-block text-[17px] text-[#ce0019] font-bold">{details.category.name}</span>
                                <h1 className="mb-5 font-bold text-3xl">{details.title}</h1>
                                <p className="mb-5 text-[17px]"><strong>Price</strong> : <strong className="text-[#ce0019]">{details.price}$</strong></p>
                                <p className="mb-5">
                                    <strong>Quality</strong> : 
                                    <input className="ml-2 w-16 px-3 text-center py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={1} type="number" />
                                </p>
                                <div className="mb-5">
                                    <strong className="mb-2 block">Descriptions</strong>
                                    <p>{details.description}</p>
                                </div>
                                <button
                                    onClick={handleAddtoCart}
                                    type="submit"
                                    className="font-bold bg-[#ce0019] text-white py-3 px-10 rounded-lg hover:bg-[#bb0016]"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className="mt-16">
                            <h2 className="font-bold text-[#ce0019] text-3xl mb-5">Releated Products</h2>
                            <Products products={releated} loading={loading} />
                        </div>
                    </>
                ) : (
                    <p className="text-center">Loading....</p>
                )}
            </main>
            <Footer/>
        </>
    );
}

export default Details;