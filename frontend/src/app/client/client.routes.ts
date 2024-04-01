import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";
import { hasPermission } from "../guards/permission.guard";

const routes: Routes = [
  { path: "perfil", component: PerfilComponent, data: { roles: ["CLIENTE"] }, canActivate: [hasPermission] }
]

export default routes;