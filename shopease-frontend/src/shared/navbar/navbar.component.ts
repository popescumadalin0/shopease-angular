import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  emptyAvatarPic = "assets/images/empty-avatar1.webp";
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}
