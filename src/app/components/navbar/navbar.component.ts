import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  currentUrl = '';
  isLogin = localStorage.getItem('isLogin');
  role: string | null = null;

  constructor(private router: Router, private api: ApiService) {
    console.log(this.isLogin);

    if (this.isLogin !== 'true') {
      alert('Login to continue');
      this.router.navigate(['/login']);
    }

    this.role = localStorage.getItem('role');
    console.log(this.role);


  }

  logout() {
    this.api.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }
}
