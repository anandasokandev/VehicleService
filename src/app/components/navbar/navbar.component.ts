import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  currentUrl: string = '';
  isLogin: string = ''


  constructor(private router: Router){
    console.log(this.router.url);
    this.isLogin = localStorage.getItem("isLogin") || '';
  }



  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('URL changed to:', this.currentUrl);
      }
    });

    if(this.isLogin != 'true'){
      alert('Please login to continue');
      this.router.navigate(['/login']);
    }
  }
}
