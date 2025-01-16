export interface typeCategory {
    id: number
    name: string
    image: string
}

export interface typeProduct {
    id: number
    title: string
    price: number
    images: string
    updatedAt: string
    category : {
        name: string
    }
}