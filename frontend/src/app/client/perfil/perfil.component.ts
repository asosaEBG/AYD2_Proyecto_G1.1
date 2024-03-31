import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { ClientService } from '../client.service';
import { Cliente } from '../client.types';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass, RouterLink, LoadingComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  imagenPerfil: string | ArrayBuffer = null;
  archivo: File = null;
  perfilForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = "";
  loading: boolean = false;

  cliente: Cliente;
  passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private clientSerivce: ClientService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  get notValidNombre(): boolean {
    return this.perfilForm.get("nombre").touched && this.perfilForm.get("nombre").invalid;
  }
  get notValidApellido(): boolean {
    return this.perfilForm.get("apellido").touched && this.perfilForm.get("apellido").invalid;
  }
  get notValidTelefono(): boolean {
    return this.perfilForm.get("telefono").touched && this.perfilForm.get("telefono").invalid;
  }
  get notValidCorreo(): boolean {
    return this.perfilForm.get("correo").touched && this.perfilForm.get("correo").invalid;
  }
  get notValidDireccion(): boolean {
    return this.perfilForm.get("direccion").touched && this.perfilForm.get("direccion").invalid;
  }
  get notValidUsername(): boolean {
    return this.perfilForm.get("username").touched && this.perfilForm.get("username").invalid;
  }
  get notValidPassword(): boolean {
    return this.perfilForm.get("password").touched && this.perfilForm.get("password").invalid;
  }
  get notValidPasswordRepeat(): boolean {
    if (this.perfilForm.get("passwordRepeat").touched && this.perfilForm.get("passwordRepeat").invalid) {
      return true;
    }
    return this.perfilForm.get("passwordRepeat").value !== this.perfilForm.get("password").value;
  }

  getUser(): void {
    this.loading = true;
    this.authService.user$.pipe(take(1)).subscribe(user => {
      this.clientSerivce.getUser(`${user.idCliente}`).pipe(take(1)).subscribe(resp => {
        console.log(resp);
        this.cliente = {
          id: resp.response_database.result[0].id,
          nombre: resp.response_database.result[0].nombre,
          apellido: resp.response_database.result[0].apellido,
          email: resp.response_cognito.email,
          password: "",
          username: resp.response_cognito.Username,
          direccion: resp.response_database.result[0].direccion_entrega,
          fotografia: resp.response_database.result[0].fotografia,
          celular: resp.response_database.result[0].celular,
          estado: resp.response_database.result[0].estado_usuario,
        };
        this.buildForm();
      }, err => {
        console.log(err);
      });
    });
  }

  buildForm(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.cliente.nombre, [Validators.required]],
      apellido: [this.cliente.apellido, [Validators.required]],
      telefono: [this.cliente.celular, [Validators.required]],
      correo: [this.cliente.email, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      passwordRepeat: [null, [Validators.required]],
      img: [null, [Validators.required]],
      direccion: [this.cliente.direccion, [Validators.required]],
      username: [this.cliente.username, [Validators.required]]
    });
    this.loading = false;
  }

  cargarImagen(event: any) {
    this.archivo = event.target.files[0];
    if (this.archivo) {
      const lector = new FileReader();
      lector.readAsDataURL(this.archivo);
      lector.onload = () => {
        this.imagenPerfil = lector.result;
      };
    }
  }

  guardar(): void {

  }
}
