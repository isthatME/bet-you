import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from 'src/app/shared/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private readonly durationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar) { }

  showNotification(displayMessage: string, buttonText: string, messageType: 'error' | 'success' | 'warn'): void {
    this._snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: messageType,
    });
  }
}
