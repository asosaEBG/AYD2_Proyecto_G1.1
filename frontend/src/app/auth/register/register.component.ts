import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showAlert: boolean = false;
  alertMessage: string = "";
  imagenPerfil: string | ArrayBuffer = null;
  vistaActual = "elegir-opcion";

  passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;

  registerForm: FormGroup = this.fb.group({
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    correo: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    passwordRepeat: [null, [Validators.required]],
    img: [null, [Validators.required]],
    direccion: [null, [Validators.required]]
  });

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get notValidNombre(): boolean {
    return this.registerForm.get("nombre").touched && this.registerForm.get("nombre").invalid;
  }
  get notValidApellido(): boolean {
    return this.registerForm.get("apellido").touched && this.registerForm.get("apellido").invalid;
  }
  get notValidTelefono(): boolean {
    return this.registerForm.get("telefono").touched && this.registerForm.get("telefono").invalid;
  }
  get notValidCorreo(): boolean {
    return this.registerForm.get("correo").touched && this.registerForm.get("correo").invalid;
  }
  get notValidDireccion(): boolean {
    return this.registerForm.get("direccion").touched && this.registerForm.get("direccion").invalid;
  }
  get notValidPassword(): boolean {
    return this.registerForm.get("password").touched && this.registerForm.get("password").invalid;
  }
  get notValidPasswordRepeat(): boolean {
    if (this.registerForm.get("passwordRepeat").touched && this.registerForm.get("passwordRepeat").invalid) {
      return true;
    }
    return this.registerForm.get("passwordRepeat").value !== this.registerForm.get("password").value;
  }

  cambiarVista(): void {
    if (this.vistaActual == "formulario-registro") {
      this.registerForm.markAllAsTouched();
      this.showAlert = false;
      if (this.registerForm.invalid) {
        return;
      }
      this.vistaActual = "elegir-opcion";
      return;
    }
  }

  register(): void {
    this.showAlert = false;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.disable();
    const registerBody = {
      nombre: this.registerForm.get("nombre").value,
      apellido: this.registerForm.get("apellido").value,
      telefono: this.registerForm.get("telefono").value,
      direccion: this.registerForm.get("direccion").value,
      correo: this.registerForm.get("correo").value,
      password: this.registerForm.get("password").value,
      img: this.registerForm.get("img").value
    };

    this.authService.register(registerBody).pipe(take(1)).subscribe(resp => {
      console.log(resp);
      this.router.navigate(["auth", "login"]);
    }, err => {
      console.log(err);
      this.showAlert = true;
      this.alertMessage = err.error.mensaje ?? "Algo salió mal.";
      this.registerForm.enable();
    });
  }

  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => {
        this.imagenPerfil = lector.result;
      };
    }
  }
}
