import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TransactionManagementService } from '../../services/transaction.management.service';
import { CommonModule } from '@angular/common';
import { PendingRequest } from '../../Interfaces/Notifications';


@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications implements OnInit{

notificationDropdownOpen = false;
pendingRequests:PendingRequest[] = [];
private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

private transactionManagementService:TransactionManagementService=
inject(TransactionManagementService)

toggleNotificationDropdown() {
  this.notificationDropdownOpen = !this.notificationDropdownOpen;
  if (this.notificationDropdownOpen) {
    this.fetchPendingRequests();
  }
}

closeNotificationDropdown() {
  this.notificationDropdownOpen = false;
}

ngOnInit() {
  this.fetchPendingRequests();
  this.cdr.detectChanges();
}

fetchPendingRequests() {
  
  this.transactionManagementService.getPendingRequestsForSeller().subscribe({
    next: (requests) => {
      this.pendingRequests=requests
    },
    error: () => this.pendingRequests = []
  });
}

approveRequest(requestId: number) {
  this.transactionManagementService.approveRequest(requestId).subscribe(() => {
    this.pendingRequests = this.pendingRequests.filter(r => r.id !== requestId);
  });
}

rejectRequest(requestId: number) {
  this.transactionManagementService.rejectRequest(requestId).subscribe(() => {
    this.pendingRequests = this.pendingRequests.filter(r => r.id !== requestId);
  });
}

}
