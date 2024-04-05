import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../empleado/empleado.service';
import { take } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import moment from "moment";
import { Router, RouterLink } from '@angular/router';
import { alarm } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const icons = { alarm };

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [NgIf, NgFor, LoadingComponent, NgClass, DatePipe, RouterLink, NgbModule],
  providers: [],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit {
  
  empleados: any[] = [];
  loading: boolean = false;
  
  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.loading = true;
    this.empleadoService.obtenerEmpleados().pipe(take(1)).subscribe(resp => {
      console.log(resp);
      this.empleados = resp.response_database.result;
      this.empleados.map(emp => {
        emp["fecha"] = moment(emp.fecha_registro, "DD/MM/YYYY h:mm:ss A").format('MM/DD/YYYY');
        return emp;
      });
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  crearEmpleado(): void {
    this.router.navigate(["admin", "empleados", "nuevo"]);
  }
  editarEmpleado(idEmpleado: number): void {
    this.router.navigate(["admin", "empleados", idEmpleado]);
  }
}
