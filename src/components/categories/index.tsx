import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
    id: number
    image: string
    name: string
}

function Categories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

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
            {loading ? (
                <ul className="grid grid-cols-3 gap-4 lg:grid-cols-6 md:grid-cols-4">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <figure className="mb-2 hover:opacity-85">
                                <a href={`category/${category.id}`}>
                                    <img 
                                        className="w-full aspect-square bg-[#ccc]"
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