import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PendingRequest } from '../Interfaces/Notifications';
// import { catchError, Observable, tap, throwError,  } from 'rxjs';
// import { Product } from '../Interfaces/Dashboard';


@Injectable({
  providedIn: 'root'
})
export class TransactionManagementService{
    private apiUrl = 'http://localhost:4000';

    private http: HttpClient = inject(HttpClient);

    getPendingRequestsForSeller():Observable<PendingRequest[]> {
        return this.http.get<PendingRequest[]>(`${this.apiUrl}/transactions/pending-requests`, { withCredentials: true });
    }

    approveRequest(requestId: number) {
      return this.http.post(
        `${this.apiUrl}/transactions/requests/action`,
        { requestId, action: 'APPROVED' },
        { withCredentials: true }
      );
    }

    rejectRequest(requestId: number) {
      return this.http.post(
        `${this.apiUrl}/transactions/requests/action`,
        { requestId, action: 'REJECTED' },
        { withCredentials: true }
      );
    }

}