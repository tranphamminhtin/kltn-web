import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private notificationServive: NotificationService) {
  }

  ngOnInit(): void {
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.notificationServive.showSuccess('Đăng xuất thành công');
  }

  getAdmin() {
    return true;
  }

  getManager() {
    return true;
  }

  getUser() {
    return true;
  }
}
