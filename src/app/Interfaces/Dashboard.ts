export interface User {
  id:number | string;  
  user_name : string;
  user_email :string;
}

export interface Product {
  id?: number | string;           
  name: string;
  price: number | string;         
  image?: string;
  description?: string;
  category?: string;
  postedById?: number | string;   
  postingDate?: string;           
  postedBy?:User;
}