import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";
import { authGuard } from "../guards/auth.guard";

const routes: Routes = [
  { path: "perfil", component: PerfilComponent, canActivate: [authGuard] }
]

export default routes;