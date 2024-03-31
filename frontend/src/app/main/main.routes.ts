import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CategoriasComponent } from "./categorias/categorias.component";
import { BuscarComponent } from "./buscar/buscar.component";
import { ValoracionesComponent } from "./valoraciones/valoraciones.component";
import { FaqComponent } from "./faq/faq.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "categorias", component: CategoriasComponent },
  { path: "buscar", component: BuscarComponent },
  { path: "valoraciones", component: ValoracionesComponent },
  { path: "faq", component: FaqComponent },
  { path: "**", redirectTo: "home" }
];

export default routes;