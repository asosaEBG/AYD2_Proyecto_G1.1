import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { MainService } from '../main.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit {
  
  categorias: string[];
  loading: boolean = false;
  
  constructor(
    private adminService: AdminService,
    private mainService: MainService
  ) {}
  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.loading = true;
    this.mainService.obtenerCategorias().pipe(take(1)).subscribe(resp => {
      console.log(resp);
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }
}
