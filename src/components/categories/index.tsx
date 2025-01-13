import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
    id: number
    image: string
    name: string
}

function Categories() {
    const [categories, setCategories] = useState<Category[]>([])
    const defaultImage = "https://i.imgur.com/QkIa5tT.jpeg"; // Fallback image

    const checkImageExists = async (imageUrl: string) => {
        try {
            const res = await axios.get(imageUrl);
            return res.status === 200;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
            if (res.statusText !== "") {
                // Check if each image URL exists, and fallback to default if not
                const updatedCategories = await Promise.all(
                    res.data.map(async (category: Category) => {
                        const imageExists = await checkImageExists(category.image);
                        if (!imageExists) {
                            category.image = defaultImage; // Set fallback image
                        }
                        return category;
                    })
                );
                setCategories(updatedCategories);
            }
        };
        fetchApi();
    }, []);

    return ( 
        <ul className="grid grid-cols-3 gap-4 lg:grid-cols-6 md:grid-cols-4">
            {categories.map((category) => (
                <li key={category.id}>
                    <figure className="mb-2 hover:opacity-85">
                        <a href={`category/${category.id}`}>
                            <img 
                                className="w-full"
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
    );
}

export default Categories;