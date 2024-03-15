import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = null;
  showAlert = false;
  alertMessage = "";

  sendEmail(): void {
    if (!this.email) {
      this.alertMessage = "Ingresar un email valido.";
      this.showAlert = true;
      return;
    }
    if (this.email.length === 0) {
      this.alertMessage = "Ingresar un email valido.";
      this.showAlert = true;
      return;
    }
  }
}
