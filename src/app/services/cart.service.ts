import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = JSON.parse(
    sessionStorage.getItem('storefront-temp-cart') || '[]'
  );
  orders: Order[] = JSON.parse(
    sessionStorage.getItem('storefront-temp-orders') || '[]'
  );

  constructor(private notificationService: NotificationService) {}

  addToCart = (product: Product, quantity: number): void => {
    // if product already exists in cart, then update quantity
    const productIndex = this.cart.findIndex((p) => p.id == product.id);
    if (productIndex > -1) {
      this.cart[productIndex].quantity += quantity;
    } else {
      this.cart.push(product);
    }
    // save it to local storage so we don't lose the cart on page refresh
    sessionStorage.setItem('storefront-temp-cart', JSON.stringify(this.cart));
    this.notificationService.openSuccessSnackBar(
      `${quantity}x ${product.name} Added To Cart`,
      ''
    );
  };

  getCart = (): Product[] => {
    return this.cart;
  };

  getItemsInCard = (): number => {
    return parseInt(
      this.cart
        .reduce((acc: number, item: Product) => acc + item.quantity, 0)
        .toFixed(1)
    );
  };

  removeFromCart(product: Product): Product[] {
    return (this.cart = this.cart.filter((p) => p !== product));
  }

  updateCart(product: Product): void {
    const productIndex = this.cart.findIndex((p) => p == product);
    if (productIndex !== -1) {
      this.cart[productIndex] = product;
    }
  }

  clearCart(): void {
    this.cart = [];
    sessionStorage.removeItem('storefront-temp-cart');
  }

  getTotalPrice(): number {
    return parseFloat(
      this.cart
        .reduce(
          (acc: number, item: Product) => acc + item.quantity * item.price,
          0
        )
        .toFixed(2)
    );
  }

  createOrder(order: Order): Order {
    this.orders.push(order);
    console.log('create new order , orders now => ', this.orders);
    sessionStorage.setItem(
      'storefront-temp-orders',
      JSON.stringify(this.orders)
    );
    return order;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: string): Order {
    return this.orders.find((val) => val.id == id) as Order;
  }
}
