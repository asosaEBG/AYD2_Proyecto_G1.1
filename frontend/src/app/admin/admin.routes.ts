import { Routes } from "@angular/router";
import { NuevoEmpleadoComponent } from "./nuevo-empleado/nuevo-empleado.component";
import { EditarEmpleadoComponent } from "./editar-empleado/editar-empleado.component";
import { EmpleadosComponent } from "./empleados/empleados.component";
import { hasPermission } from "../guards/permission.guard";

const routes: Routes = [
  { path: "empleados", component: EmpleadosComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "empleados/nuevo", component: NuevoEmpleadoComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "empleados/:idEmpleado", component: EditarEmpleadoComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "**", redirectTo: "empleados" }
];

export default routes;