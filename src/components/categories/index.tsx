import { typeCategory } from "../../interfaces";

interface Props {
    categories: typeCategory[]
    loading: boolean
}

const Categories:React.FC<Props> = ({categories, loading}) => {
    return ( 
        <>
            {!loading ? (
                <ul className="grid grid-cols-3 gap-4 lg:grid-cols-6 md:grid-cols-4">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <figure className="mb-2 hover:opacity-85">
                                <a href={`category/${category.id}`}>
                                    <img 
                                        className="w-full object-cover aspect-square bg-[#ccc]"
                                        src={category.image}
                                        alt={category.name}
                                    />
                                </a>
                            </figure>
                            <h3 className="inline-block text-[#3b3b3b] hover:text-[#0a0a0a]">
                                <a href={`category/${category.id}`}>{category.name}</a>
                            </h3>
                        </li>
                    ))}
                </ul> 
            ) : (
                <p className="text-center text-xl">Loading...</p>
            )}
        </>
    );
}

export default Categories;