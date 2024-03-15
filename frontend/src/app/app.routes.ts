import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: "auth", loadChildren: () => import("./auth/auth.routes") },
  { path: "**", redirectTo: "auth" }
];
