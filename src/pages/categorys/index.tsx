import axios from 'axios';
import Categories from '../../components/categories';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { useEffect, useState } from 'react';
import { typeCategory } from '../../interfaces';

function Category() {
    const [loading, setLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<typeCategory[]>([])

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

    return ( 
        <>
            <Header />
            <main className="container mx-auto px-3">
                <h2 className="text-center font-bold text-3xl text-[#ce0019] mb-8">CATEGORIES</h2>
                <Categories categories={categories} loading={loading} />
            </main>
            <Footer />
        </>
    );
}

export default Category;