import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
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

interface Filters {
    rangePrice: number
    sort: string
    categories: string[]
}

function Product() {
    const [categories, setCategories] = useState<typeCategory[]>([])
    const [products, setProducts] = useState<typeProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<Filters>({
        rangePrice : 50,
        sort : '',
        categories: []
    })

    const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        setFilters((prev) => {
            return {
                ...prev, 
                rangePrice: value
            }
        })
    }
    
    const handleSort = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setFilters((prev) => {
            return {
                ...prev,
                sort: value
            }
        })
    }
    const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const checked = event.target.checked

        setFilters((prev) => {
            let updateCategory = [];
            if(checked) {
                updateCategory = [...prev.categories, value]
            }else {
                updateCategory = prev.categories.filter(cat => cat !== value)
            }
            return { ...prev, categories: updateCategory };
        });
    }

    // loading Cateogry
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

    const debouce = (callback: (...args: Filters[]) => void, delay: number) => {
        let timeout: ReturnType<typeof setTimeout> | null = null;
        return (...args: Filters[]) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    };
        
    const requestApiProduct = useCallback(debouce(async (filters) => {
        try {
            setLoading(true)
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0`);
            if(res.statusText != "") {
                let data = res.data

                data = data.filter((item:typeProduct) => item.price < filters.rangePrice)

                if(filters.sort == 'desc') {
                    data = data.sort((a: typeProduct, b: typeProduct) => {
                        return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
                    });
                } else if(filters.sort == 'asc') {
                    data = data.sort((a: typeProduct, b: typeProduct) => {
                        return new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
                    });
                } else if(filters.sort == 'price-desc') {
                    data = data.sort((a: typeProduct, b: typeProduct) => {
                        return b.price - a.price;
                    });
                } else if(filters.sort == 'price-asc') {
                    data = data.sort((a: typeProduct, b: typeProduct) => {
                        return a.price - b.price;
                    });
                }

                data = data.filter((item:typeProduct) => {
                    if(filters.categories.length > 0) {
                        return filters.categories.includes(item.category.name)
                    } else {
                        return item
                    }
                })
                setProducts(data);
            }
        }catch(err) {
            console.log(err)
        }finally {
            setLoading(false)
        }
    },1000), []);
    
    // loading Products
    useEffect(() => {
        requestApiProduct(filters)
    },[filters])

    return (
        <>
            <Header />
            <main className="container mx-auto px-3">
                <div className='flex gap-10'>
                    <div className='w-[12%]'>
                        <h3 className="mb-5 text-xl font-bold text-[#ce0019]">Filter</h3>
                        <p className="flex items-center justify-between mb-2">
                            <strong>Price</strong>
                            <span>{filters.rangePrice}$</span>
                        </p>
                        <div className="mb-5">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={filters.rangePrice}
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