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
                <ul className="grid grid-cols-4 gap-6">
                    {products.map((product) => (
                        <li key={product.id}>
                            <figure className="mb-4 hover:opacity-85">
                                <a href="/">
                                    <img 
                                        className="w-full aspect-square bg-[#ccc]"
                                        src={product.images[0]} 
                                        alt={product.title}
                                    />
                                </a>
                            </figure>
                            <div className="text-center">
                                <h3 className="text-[#8A8A8F] mb-1 hover:text-[#59595a]"><a href="">{product.title}</a></h3>
                                <p className="text-[#ce0019]">{product.price}$</p>
                            </div>
                        </li>
                    ))}
                </ul>
                {handleLoadMore && (
                    <div className='text-center mt-10'>
                        <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handleLoadMore}>Load more</button>
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