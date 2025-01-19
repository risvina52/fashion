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
                    setReleated(filterReleated)
                }
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchApi();
    },[])
    return (
        <>
            <Header/>
            <main className="container mx-auto px-3">
                {!loading ? (
                    <>
                        <div className="flex gap-10">
                            <div className="w-[35%]">
                                <div className="aspect-square bg-[#ccc]">
                                    <img src={details.images[0]} alt={details.title} />
                                </div>
                            </div>
                            <div className="w-[65%]">
                                <span className="mb-2 inline-block text-[17px] text-[#ce0019] font-bold">{details.category.name}</span>
                                <h1 className="mb-5 font-bold text-3xl">{details.title}</h1>
                                <p className="mb-5 text-[17px]">Price : <strong className="text-[#ce0019]">{details.price}$</strong></p>
                                <p className="mb-5">{details.description}</p>
                                <button
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