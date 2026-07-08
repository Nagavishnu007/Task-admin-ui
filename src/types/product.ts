// Shared product type used across ProductCard and ProductsPage
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}
