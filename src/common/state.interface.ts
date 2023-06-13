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

  export interface TFormType {
    productData?: TProductDto | null;
    setCall: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface TableData{
    data: TProductDto[]
    handleDeleteProduct:(id: string) => void;
    handleUpdateProduct:(data: TProductDto) => void;
    handleSelectProduct:(id: string) => void;
}