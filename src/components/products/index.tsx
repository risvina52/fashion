import axios from 'axios';
import { useEffect, useState } from 'react';

interface Products {
    id: number
    title: string
    price: number
    images: string
}

function Products() {
    const [products, setProducts] = useState<Products[]>([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=8');
            if(res.statusText != "") {
                setProducts(res.data);
            }
        }
        fetchApi();
    },[])
    
    return ( 
        <>
            <ul className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <li key={product.id}>
                        <figure className="mb-4 hover:opacity-85">
                            <a href="/">
                                <img 
                                    className="w-full"
                                    src={product.images[0]} 
                                    alt={product.title}
                                />
                            </a>
                        </figure>
                        <div className="text-center">
                            <h3 className="text-[#8A8A8F] mb-1 hover:text-[#59595a]"><a href="">{product.title}</a></h3>
                            <p className="text-[#ce0019]">{product.price}$</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Products;