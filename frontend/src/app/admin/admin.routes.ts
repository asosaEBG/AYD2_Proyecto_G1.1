import { Routes } from "@angular/router";
import { NuevoEmpleadoComponent } from "./empleados/nuevo-empleado/nuevo-empleado.component";
import { EditarEmpleadoComponent } from "./empleados/editar-empleado/editar-empleado.component";
import { EmpleadosComponent } from "./empleados/empleados.component";
import { hasPermission } from "../guards/permission.guard";
import { ProductosComponent } from "./productos/productos.component";
import { NuevoProductoComponent } from "./productos/nuevo-producto/nuevo-producto.component";
import { EditarProductoComponent } from "./productos/editar-producto/editar-producto.component";
import { ProveedoresComponent } from "./proveedores/proveedores.component";

const routes: Routes = [
  { path: "proveedores", component: ProveedoresComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "productos", component: ProductosComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "productos/nuevo", component: NuevoProductoComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "productos/:idProducto", component: EditarProductoComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "empleados", component: EmpleadosComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "empleados/nuevo", component: NuevoEmpleadoComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "empleados/:idEmpleado", component: EditarEmpleadoComponent, data: { roles: ["ADMINISTRADOR"] }, canActivate: [hasPermission] },
  { path: "**", redirectTo: "empleados" }
];

export default routes;