import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(private cartService: CartService) {}

  cartCount(): number {
    return this.cartService.getItemsInCard();
  }
}
