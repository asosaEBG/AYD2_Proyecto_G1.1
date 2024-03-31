import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, NgClass, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  username: string;
  loading: boolean = true;

  constructor(
    private router: Router,
    private authSerivce: AuthService
  ) {
  }

  
  ngOnInit(): void {
    this.loading = true;
    this.authSerivce.user$.subscribe(user => {
      this.username = user.username;
      this.loading = false;
    });
  }

  isHomeSubs(): void {
    
  }

}
