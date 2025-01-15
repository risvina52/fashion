import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Products from '../../components/products';
import { typeCategory, typeProduct } from '../../interfaces';

const sorts = [
    {
        name: 'Lastest',
        slug: 'desc'
    },
    {
        name: 'Oldest',
        slug: 'asc'
    },
    {
        name: 'Price Low to High',
        slug: 'price-asc'
    },
    {
        name: 'Price Hight to Low',
        slug: 'price-desc'
    },
]

function Product() {
    const [rangePrice, setRangePrice] = useState<number>(50);
    const [categories, setCategories] = useState<typeCategory[]>([])
    const [products, setProducts] = useState<typeProduct[]>([])
    const storageCheckbox = useRef<string[]>([])

    const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        setRangePrice(value)
    }
    const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log(value)
    }
    const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const checked = event.target.checked
        if(checked) {
            if (!storageCheckbox.current.includes(value)) {
                storageCheckbox.current.push(value);
            }
        }else {
            storageCheckbox.current = storageCheckbox.current.filter(item => item !== value);
        }

        try {
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=12`);
            if(res.statusText != "") {
                const filter = res.data.filter((item:typeCategory) => {
                    return storageCheckbox.current.includes(item.category.name)
                })
                setProducts(filter)
            }
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
                if (res.statusText !== "") {
                    setCategories(res.data)
                }
            } catch(err) {
                console.log(err)
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            <Header />
            <main className="container mx-auto px-3">
                <div className='flex gap-10'>
                    <div className='w-[12%]'>
                        <h3 className="mb-5 text-xl font-bold text-[#ce0019]">Filter</h3>
                        <p className="flex items-center justify-between mb-2">
                            <strong>Price</strong>
                            <span>{rangePrice}$</span>
                        </p>
                        <div className="mb-5">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={rangePrice}
                                className="w-full accent-[#000]"
                                onChange={handleChangeRange}
                            />
                        </div>
                        <p className="font-bold mb-2">Sort</p>
                        <div className="mb-5">
                            {sorts.map((sort, index) => (
                                <label key={index} className="flex mb-1">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="mr-2 accent-[#000]"
                                    onChange={handleSort}
                                    value={sort.slug}
                                />
                                {sort.name}
                                </label>
                            ))}
                        </div>

                        <p className="font-bold mb-2">Category</p>
                        <div>
                            {categories.map((cat) => (
                                <label key={cat.id} className="flex mb-1">
                                <input
                                    type="checkbox"
                                    name="branch"
                                    className="mr-2 accent-[#000]"
                                    onChange={handleCheckbox}
                                    value={cat.name}
                                />
                                {cat.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='w-[88%]'>
                        {products.map((product) => (
                            <li key={product.id}>{product.title}</li>
                        ))}
                        <Products />
                    </div>
                </div>
            </main>
            <Footer />
        </>
      );
}

export default Product;