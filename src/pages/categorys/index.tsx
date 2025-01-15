import Categories from '../../components/categories';
import Footer from '../../components/footer';
import Header from '../../components/header';

function Category() {
    return ( 
        <>
            <Header />
            <main className="container mx-auto px-3">
                <Categories />
            </main>
            <Footer />
        </>
    );
}

export default Category;