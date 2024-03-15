import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from "../auth.service";
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass, RouterLink],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  
  loading: boolean = true;
  loginForm: FormGroup;
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

  get notValidCorreo(): boolean {
    return this.loginForm.get("correo").touched && this.loginForm.get("correo").invalid;
  }
  get notValidPassword(): boolean {
    return this.loginForm.get("password").touched && this.loginForm.get("password").invalid;
  }

  createForm(): void {
    this.loading = true;
    this.loginForm = this.fb.group({
      correo: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    });
    this.loading = false;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.showAlert = false;
    this.loginForm.disable();
    const loginBody = {
      correo: this.loginForm.get("correo").value,
      password: this.loginForm.get("password").value
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
      this.loginForm.enable();
      this.showAlert = true;
      this.loading = false;
    }
  }
}
