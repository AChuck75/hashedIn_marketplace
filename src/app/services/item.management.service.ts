import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError,  } from 'rxjs';
import { Product } from '../Interfaces/Dashboard';


@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {
  private apiUrl = 'http://localhost:4000'; // Your Express API base URL

  private http: HttpClient = inject(HttpClient);
//   private itemsSubject = new BehaviorSubject<any[]>([]);
//   public items$ = this.itemsSubject.asObservable();


    postItem(product: Product) {
        return this.http.post(
            `${this.apiUrl}/api/products`, // Adjust endpoint if needed
            product,
            { withCredentials: true }
        ).pipe(
            tap((response) => {
            console.log('Product posted successfully:', response);
            }),
            catchError(error => {
            console.error('Error posting product:', error);
            return throwError(() => error);
            })
        );
    }

    getProductsForUser(userId: string) {
    return this.http.get<Product[]>(
        `${this.apiUrl}/api/productByUser/${userId}`,
        { withCredentials: true }
    ).pipe(
        tap((response) => {
        console.log('Fetched products:', response);
        }),
        catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
        })
    );
    }
    deleteProductByUser(productId:string){
        return this.http.delete(
            `${this.apiUrl}/api/products/${productId}`,
            {withCredentials:true}
        ).pipe(
            tap((res)=>{
                console.log(res)
            }),
            catchError(error => {
                console.error('Error deleting products:', error);
                return throwError(() => error);
            })
        )
    }
    buyProduct(productId: number | string)   {
        return this.http.post(
            `${this.apiUrl}/api/products/${productId}/buy`,
            {},
            { withCredentials: true }
        );
    }
    editProductByUser(product:Product): Observable<Product> {
        return this.http.put<Product>(
            `${this.apiUrl}/api/products/${product.id}`,
            product,
            { withCredentials: true }
            ).pipe(
            tap((response) => {
                console.log('Product updated successfully:', response);
            }),
            catchError(error => {
                console.error('Error updating product:', error);
                return throwError(() => error);
            })
            );
    }

}   