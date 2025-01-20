import { typeProduct } from '../../interfaces';

interface Props {
    products: typeProduct[]
    loading: boolean
    handleLoadMore?: () => void
}

const Products:React.FC<Props> = ({products, loading, handleLoadMore}) => {
    return ( 
        <>
            {!loading ? (
                <>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                        <img
                            alt={product.title}
                            src={product.images[0]}
                            className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                        <div className="mt-3 flex justify-between">
                            <h3 className="text-black">
                                <a href={`/product/${product.id}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.title}
                                </a>
                            </h3>
                            <p className=" text-[#ce0019]">{product.price}$</p>
                        </div>
                        </div>
                    ))}
                </div>
                {handleLoadMore && (
                    <div className='text-center mt-8'>
                        <button className='bg-black text-white py-2 px-5 rounded-lg hover:opacity-75 focus:outline-none' onClick={handleLoadMore}>Load more</button>
                    </div>
                )}
                </>
            ) : (
                <p className="text-center text-xl">Loading...</p>
            )}
        </>
    );
}

export default Products;