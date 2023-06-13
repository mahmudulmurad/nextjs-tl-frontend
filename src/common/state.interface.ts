export interface FormData {
    username: string;
    password: string;
  }
 export interface Message {
    error: string;
    success: string;
  }
export interface ProductForm {
    productName: string;
    categoryId: number;
    categoryName: string;
    price: number;
    status: boolean;
  }

  export interface TProductDto{
    id: string;
    productName: string;
    categoryId: number;
    categoryName: string;
    price: number;
    status: boolean;
  }