import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
 
  loading: boolean = true;
  setPasswordForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = "";
  
  passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  get notValidRepeatPassowrd(): boolean {
    return this.setPasswordForm.get("repeatPassword").touched && this.setPasswordForm.get("repeatPassword").invalid;
  }
  get notValidPassword(): boolean {
    return this.setPasswordForm.get("password").touched && this.setPasswordForm.get("password").invalid;
  }

  createForm(): void {
    this.loading = true;
    this.setPasswordForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      repeatPassword: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    });
    this.loading = false;
  }

  reestablecer(): void {
    if (this.setPasswordForm.invalid) {
      return;
    }
    if (this.setPasswordForm.get("password").value !== this.setPasswordForm.get("repeatPassword").value) {
      this.alertMessage = "No coincide la contraseña.";
      this.showAlert = true;
      return;
    }
    this.showAlert = false;
    this.setPasswordForm.disable();
    const loginBody = {
      correo: this.setPasswordForm.get("correo").value,
      password: this.setPasswordForm.get("password").value
    };

    if (loginBody.correo === "admin@gmail.com" && loginBody.password === "Admin.123") {
      const adminBody = {
        id_usuario: "admin",
        nombre: "Administrador",
        apellido: "",
        correo: "admin@gmail.com",
        password: "Admin.123",
        numero_tel: "12345678",
        fecha_nac: new Date().toISOString()
      };
      // this.appService.saveToken(JSON.stringify(adminBody));
      this.router.navigate(["home"]);
      return;
    } else {
      this.alertMessage = "Usuario o contraseña incorrectas.";
      this.setPasswordForm.enable();
      this.showAlert = true;
      this.loading = false;
    }
  }
}
