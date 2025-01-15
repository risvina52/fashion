import Footer from '../../components/footer';
import Header from '../../components/header';
import Products from '../../components/products';

function Product() {
    return ( 
        <>
            <Header />
            <main className="container mx-auto px-3">
                <div className='flex gap-10'>
                    <div className='w-[15%]'>
                        <h3 className='mb-5 text-xl'>Filter</h3>
                        <p>Price</p>
                        <div className='flex gap-3 items-center'>
                            <span>0 $</span>
                            <input type='range' min="0" max="100" />
                            <span>100 $</span>
                        </div>
                        <p>Branch</p>
                        <div className=''>
                            <label><input type='radio' name='branch' />Bitis</label>
                            <label><input type='radio' name='branch' />Bitis</label>
                            <label><input type='radio' name='branch' />Bitis</label>
                            <label><input type='radio' name='branch' />Bitis</label>
                            <label><input type='radio' name='branch' />Bitis</label>
                        </div>
                        <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5'>Submit</button>
                    </div>
                    <div className='w-[85%]'>
                        <Products />
                    </div>
                </div>
            </main>
            <Footer />
        </>
      );
}

export default Product;