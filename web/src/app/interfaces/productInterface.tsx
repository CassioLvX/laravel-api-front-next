export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_path: string | undefined;
    created_at: string;
    updated_at: string;
}

export interface ProductCollection {
    data: Product[];
    meta: Meta
}

export interface PriceRange {
    minPriceValue: number;
    maxPriceValue: number;
}

export interface Meta {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    filters: Filters;
    price_range: PriceRange
}

export interface Filters {
        min_price: number | null;
        max_price: number | null;
}
