import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  orderInfo!: Order;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.orderInfo = this.cartService.getOrder(id);
    if (this.orderInfo === undefined) {
      // if no order exists redirect to main page.
      this.router.navigate(['/']);
    }
  }
}
