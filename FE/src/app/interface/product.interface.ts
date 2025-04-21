export interface IProduct {
  id: any;
  productId: number;             
  title: string;                 
  author: string;               
  publisher: string;       
  price: number;               
  description: string;     
  images: string;                
  shortDescription: string;      
  publicationDate?: string | null;  
  categoryId?: number | null; 
  categoryName?: string;   
}