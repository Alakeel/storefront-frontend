import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnInit {
  ngOnInit(): void {}
  constructor(private _snackBar: MatSnackBar) {}

  openSuccessSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['center-snackbar'],
    });
  }
}
