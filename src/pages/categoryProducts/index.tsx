import axios from 'axios';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { useEffect, useState } from 'react';
import { typeCategory, typeProduct } from '../../interfaces';
import { useParams } from 'react-router';
import Products from '../../components/products';

function CategoryProducts() {
    const { categoryId } = useParams()
    const categoryIdNumber = Number(categoryId);
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<typeProduct[]>([])
    const [catName, setCatName] = useState<string>('')

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
                if (res.statusText !== "") {
                    const filter = res.data.filter((cat:typeCategory) => cat.id === categoryIdNumber)
                    setCatName(filter[0].name);
                }
            }catch(err) {
                console.log(err)
            }finally {
                setLoading(false)
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0`);
                if (res.statusText !== "") {
                    const filterCategory = res.data.filter((cat:typeProduct) => cat.category.id == categoryIdNumber)
                    setProducts(filterCategory);
                }
            }catch(err) {
                console.log(err)
            }finally {
                setLoading(false)
            }
        };
        fetchApi();
    }, []);

    return ( 
        <>
            <Header />
            <main className="container mx-auto px-3">
                <h2 className="text-center font-bold text-3xl text-[#ce0019] mb-8">
                    {catName}
                </h2>
                <Products products={products} loading={loading} />
            </main>
            <Footer />
        </>
    );
}

export default CategoryProducts;