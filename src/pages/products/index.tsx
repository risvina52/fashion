import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
        name: 'Price Hight to Low',
        slug: 'price-desc'
    },
    {
        name: 'Price Low to High',
        slug: 'price-asc'
    },
]

function Product() {
    const [rangePrice, setRangePrice] = useState<number>(0);
    const [categories, setCategories] = useState<typeCategory[]>([])
    const [products, setProducts] = useState<typeProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const storageCheckbox = useRef<string[]>([])

    const debouce = (callback: (event: number) => void, delay: number) => {
          let timeout: ReturnType<typeof setTimeout> | null = null;

          return (event: number) => {
            if (timeout) {
              clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
              callback(event);
            }, delay);
        };
    }
        
    const requestApiProduct = useCallback(debouce(async (value) => {
        try {
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0`);
            if(res.statusText != "") {
                const filteredProducts = res.data.filter((item: typeProduct) => {
                    return item.price < value
                });
                setProducts(filteredProducts);
            }
        }catch(err) {
            console.log(err)
        }
    },1000), []);

    const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        setRangePrice(value)
        requestApiProduct(value)
    }
    
    const handleSort = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        try {
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0`);
            if(res.statusText != "") {
                let data = [];
                if(value == 'desc') {
                    data = res.data.sort((a: typeProduct, b: typeProduct) => {
                        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                    });
                } else if(value == 'asc') {
                    data = res.data.sort((a: typeProduct, b: typeProduct) => {
                        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
                    });
                } else if(value == 'price-desc') {
                    data = res.data.sort((a: typeProduct, b: typeProduct) => {
                        return b.price - a.price;
                    });
                } else if(value == 'price-asc') {
                    data = res.data.sort((a: typeProduct, b: typeProduct) => {
                        return a.price - b.price;
                    });
                }
                setProducts(data)
            }
        }catch(err) {
            console.log(err)
        }
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
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0`);
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

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0`);
                if(res.statusText != "") {
                    setProducts(res.data);
                }
            }catch(err) {
                console.log(err)
            }finally {
                setLoading(false)
            }
        }
        fetchApi();
    },[])

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
                        <Products products={products} loading={loading} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
      );
}

export default Product;