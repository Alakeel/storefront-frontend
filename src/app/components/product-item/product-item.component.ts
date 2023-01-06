import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCart: EventEmitter<{ product: Product; quantity: number }> =
    new EventEmitter();

  // when API is integrated, quantity will be taken from database
  quantity: number = 1;
  quantityList: number[] = [...Array(11).keys()].slice(1);
  submitBtnLabel: string = '';

  constructor() {}

  ngOnInit(): void {
    this.submitBtnLabel =
      this.product['quantity'] > 0 ? 'Add to cart' : 'Out of Stock';
  }

  onSubmit = (product: Product) => {
    const quantity = this.quantity;
    this.addToCart.emit({ product, quantity });
    this.quantity = 1;
  };

  get isSubmitBtnDisabled(): boolean {
    return this.product.quantity < 0;
  }
}
