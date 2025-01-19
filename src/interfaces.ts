export interface typeCategory {
    id: number
    name: string
    image: string
}

export interface typeProduct {
    id: number
    title: string
    price: number
    description: string
    images: string
    creationAt: string
    updatedAt: string
    category : {
        id: number
        name: string
    }
}