import Banner from '../../components/banner';
import Categories from '../../components/categories';
import Footer from '../../components/footer';
import Header from '../../components/header';
import News from '../../components/news';
import Products from '../../components/products';

function Home() {
    return ( 
        <>
        <Header />
        <main className="container mx-auto px-3">
            <Banner />
            <section className="mt-12">
                <h2 className="text-center font-bold text-3xl text-[#ce0019] mb-8">CATEGORIES</h2>
                <Categories />
            </section>
            <section className="mt-12">
                <h2 className="text-center font-bold text-3xl text-[#ce0019] mb-8">ALL PRODUCTS</h2>
                <Products />
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