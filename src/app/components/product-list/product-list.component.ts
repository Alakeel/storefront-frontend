import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

interface model {
  product: Product;
  quantity: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isDataLoaded: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const product = data[index];
        product['quantity'] = 1;
      }
      this.products = data;
      this.isDataLoaded = true;
    });
  }

  addToCart(data: model): void {
    this.cartService.addToCart(data.product, data.quantity);
  }
}
