import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productsInCart: Product[] = [];
  fullName!: string;
  address!: string;
  creditCardNumber!: string;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.productsInCart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cart']);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  removeItem(product: Product): void {
    this.productsInCart = this.cartService.removeFromCart(product);
  }

  updateCart(product: Product): void {
    this.cartService.updateCart(product);
  }

  onSubmitOrder(): void {
    const order: Order = {
      id: Math.random().toString(16).slice(2),
      full_name: this.fullName,
      address: this.address,
      total_price: this.getTotalPrice(),
      cc_number: this.creditCardNumber
    };

    const orderId = this.cartService.createOrder(order).id;
    this.cartService.clearCart();
    this.router.navigate(['/confirmation', orderId]);
  }
}
