import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";
import { hasPermission } from "../guards/permission.guard";
import { MetodosPagoComponent } from "./metodos-pago/metodos-pago.component";
import { NuevoMetodoPagoComponent } from "./metodos-pago/nuevo-metodo-pago/nuevo-metodo-pago.component";

const routes: Routes = [
  { path: "perfil", component: PerfilComponent, data: { roles: ["CLIENTE"] }, canActivate: [hasPermission] },
  { path: "metodos-pago", component: MetodosPagoComponent, data: { roles: ["CLIENTE"] }, canActivate: [hasPermission] },
  { path: "metodos-pago/nuevo", component: NuevoMetodoPagoComponent, data: { roles: ["CLIENTE"] }, canActivate: [hasPermission] },
]

export default routes;