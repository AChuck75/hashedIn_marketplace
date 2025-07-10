import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../Interfaces/Dashboard';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemManagementService } from '../../services/item.management.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
  imports: [FormsModule,CommonModule,MatMenuModule,MatIconModule,MatButtonModule] 
})
export class ProductCardComponent {
  @Input()
  product!: Product;
  isEditing = false;
  @Output() delete = new EventEmitter<string>();
  private itemManagementService:ItemManagementService=inject(ItemManagementService);
  originalProduct: Product | null = null;
  
saveAllProducts() {
  this.isEditing = false;

  console.log(this.product)
  if (!this.originalProduct) {
    alert('No original product data to compare.');
    return;
  }

  this.itemManagementService
    .editProductByUser(this.product)
    .subscribe({
      next: (response) => {
        if (response) {
          // Optionally update local product data or show a success message
          alert('Product updated successfully!');
        } else {
          // No changes were made
          alert('No changes detected. Nothing was updated.');
        }
        // Optionally reset originalProduct
        this.originalProduct = null;
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product. Please try again.');
        // Optionally revert isEditing to true if you want to let the user try again
      }
    });
}

  onEdit(product: Product) {
    this.originalProduct = { ...product };
    this.isEditing = true;
  }

  onDelete(product: Product) {
    this.itemManagementService.deleteProductByUser(product.id as string).subscribe({
      next: (response) => {
        console.log(response)
        alert('deleted successfully')
        this.delete.emit(product.id as string); 
      },
      error: (err) => {
        console.error(err)
      },
    
    })
  }
}