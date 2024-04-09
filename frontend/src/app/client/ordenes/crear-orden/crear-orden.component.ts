import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { CurrencyPipe, DatePipe, Location, NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Carrito } from '../../carrito/carrito.types';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/auth.types';
import { take } from 'rxjs';
import { ConfirmActionComponent } from '../../../modals/confirm-action/confirm-action.component';

@Component({
  selector: 'app-crear-orden',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgbModule, LoadingComponent, FormsModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './crear-orden.component.html',
  styleUrl: './crear-orden.component.scss'
})
export class CrearOrdenComponent implements OnInit {
  
  loading: boolean = false;
  carrito: Carrito;
  metodosPago: any[] = [];
  user: User;
  metodoPagoSeleccionadoId: number = null;
  file: File;

  constructor(
    private clietSerivce: ClientService,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}
  
  get total(): number {
    let total = 0;
    this.carrito.carrito.productos.map(pr => {
      total += (pr.cantidad * pr.precio_unidad);
    });
    return total;
  }

  get metodoPagoSeleccionado(): any {
    if (this.metodoPagoSeleccionadoId === null) {
      return null;
    }
    return this.metodosPago.find(mp => mp.id === this.metodoPagoSeleccionadoId);
  }

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(): void {
    this.loading = true;
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.clietSerivce.getCarrito(this.user.idCliente).pipe(take(1)).subscribe(resp => {
        console.log(resp);
        this.carrito = resp.response_dinamodb;
        this.getMetodosPago();
      }, err => {
        console.log(err);
      });
    })
  }

  getMetodosPago(): void {
    this.clietSerivce.getMetodosPago(this.user.idCliente).pipe(take(1)).subscribe(resp => {
      this.metodosPago = resp.response_database.result.map(met => {
        if (met.tipo_metodo_pago === "TARJETA") {
          met["detalles"] = `[TARJETA] Termina en: ${met.numero_tarjeta.slice(11, 15)}, exp ${met.fecha_exp}`;
        } else if (met.tipo_metodo_pago === "TRANSFERENCIA") {
          met["detalles"] = "[TRANSFERENCIA] Subir el comprobante de la transferencia.";
        } else {
          met["detalles"] = "[EFECTIVO] Pagar en efectivo al momento de la entrega.";
        }
        return met;
      });
      console.log(this.metodosPago);
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

  onCVSelected(event): void {
    this.file = event.target.files[0];
  }
  irAMetodosPago(): void {
    this.router.navigate(["cliente", "metodos-pago"])
  }

  confirmar(): void {
    if (this.metodoPagoSeleccionado.tipo_metodo_pago === "TRANSFERENCIA" && !this.file) {
      return;
    } 
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.title = "Confirmar Compra";
    modal.componentInstance.description = "Estas seguro que quieres confirmar la compra?";
    modal.result.then(() => {

    }, () => {});
  }

}
