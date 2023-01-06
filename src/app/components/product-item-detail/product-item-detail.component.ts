import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  // when API is integrated, quantity will be taken from database
  quantity: number = 1;
  quantityList: number[] = [...Array(11).keys()].slice(1);
  submitBtnLabel: string = '';
  product!: Product;
  hasLoaded: boolean = false;

  constructor(
    private location: Location,
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activeRoute.snapshot.params['id']);
    if (isNaN(id) || id === undefined) {
      return;
    }
    this.productService.getProducts().subscribe((data) => {
      const found = data.filter((p) => p.id == id)[0];
      if (found) {
        found['quantity'] = 1;
        this.product = found;

        this.submitBtnLabel =
          this.product['quantity'] > 0 ? 'Add to cart' : 'Out of Stock';
      }
      this.hasLoaded = true;
    });
  }

  onSubmit = (product: Product) => {
    this.cartService.addToCart(product, this.quantity);
    this.quantity = 1;
  };

  get isSubmitBtnDisabled(): boolean {
    return this.product.quantity < 0;
  }

  navigateBack() {
    this.location.back;
  }
}
