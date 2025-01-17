import axios from 'axios';
import Banner from '../../components/banner';
import Categories from '../../components/categories';
import Footer from '../../components/footer';
import Header from '../../components/header';
import News from '../../components/news';
import Products from '../../components/products';
import { useEffect, useState } from 'react';
import { typeCategory, typeProduct } from '../../interfaces';

function Home() {
    const [loading, setLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<typeCategory[]>([])
    const [products, setProducts] = useState<typeProduct[]>([])
    const [nextPage, setNextPage] = useState<number>(4);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
                if (res.statusText !== "") {
                    setCategories(res.data);
                }
            }catch(err) {
                console.log(err)
            }finally {
                setLoading(true)
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=4`);
                if(res.statusText != "") {
                    setProducts(res.data);
                    setNextPage(nextPage + 4)
                }
            }catch(err) {
                console.log(err)
            }finally {
                setLoading(false)
            }
        }
        fetchApi();
    },[])

    const handleLoadMore = async () => {
        try {
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${nextPage}`);
            if(res.statusText != "") {
                setProducts(res.data);
                setNextPage(nextPage + 4)
            }
        }catch(err) {
            console.log(err)
        }
    }
    return ( 
        <>
        <Header />
        <main className="container mx-auto px-3">
            <Banner />
            <section className="mt-12">
                <h2 className="text-center font-bold text-3xl text-[#ce0019] mb-8">CATEGORIES</h2>
                <Categories categories={categories} loading={loading} />
            </section>
            <section className="mt-12">
                <h2 className="text-center font-bold text-3xl text-[#ce0019] mb-8">ALL PRODUCTS</h2>
                <Products products={products} loading={loading} handleLoadMore={handleLoadMore} />
            </section>
            
            <section className="mt-20">
                <h2 className="text-center font-bold text-3xl mb-8">NEWS</h2>
                <News />
            </section>
        </main>
        <Footer />
        </>
     );
}

export default Home;