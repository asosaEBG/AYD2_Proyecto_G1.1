import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "auth", loadChildren: () => import("./auth/auth.routes") },
  { path: "cliente", loadChildren: () => import("./client/client.routes") },
  { path: "", loadChildren: () => import("./main/main.routes") },
  { path: "**", redirectTo: "auth" }
];
