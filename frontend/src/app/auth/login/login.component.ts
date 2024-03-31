import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from "../auth.service";
import { NgClass, NgIf } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass, RouterLink]
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

  get notValidUsername(): boolean {
    return this.loginForm.get("username").touched && this.loginForm.get("username").invalid;
  }
  get notValidPassword(): boolean {
    return this.loginForm.get("password").touched && this.loginForm.get("password").invalid;
  }

  createForm(): void {
    this.loading = true;
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    });
    this.loading = false;
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.showAlert = false;
    this.loginForm.disable();
    const loginBody = {
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value
    };
    this.authService.login(loginBody).pipe(take(1)).subscribe(resp => {
      console.log(resp);
      this.showAlert = false;
      this.router.navigate(["home"]);
    }, err => {
      console.log(err);
      this.loginForm.enable();
      this.alertMessage = err.error.message;
      this.showAlert = true;
    });
    
  }
}
