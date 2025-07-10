import { Product } from "./Dashboard";
export interface UserDTO {
  user_name: string;
  id: string;
}
export interface PendingRequest {
  id: number;
  productId: number;
  buyerId: string;
  sellerId: string;
  type: string;
  date: Date; 
  status: string;
  product: Product;
  buyer: UserDTO;
  seller: UserDTO;
}