import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private notificationService: NotificationService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.checkSession()) {
      return new Promise((resolve) => {
        this.http.get('http://localhost:3000/user/verifyToken/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
          .subscribe(res => {
            if (!res['success']) {
              localStorage.clear();
              this.router.navigate(['/login'], { queryParams: { return: state.url } });
              if (res['login'])
                this.notificationService.showInfor('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
              resolve(false);
            } else
              resolve(true);
          }, err => {
            localStorage.clear();
            this.router.navigate(['/login'], { queryParams: { return: state.url } });
            resolve(false);
          });
      });
    } else {
      this.router.navigate(['/login'], { queryParams: { return: state.url } });
      return false;
    }
  }

  checkSession(): boolean {
    if (localStorage.getItem('email') && localStorage.getItem('token') && localStorage.getItem('right')) {
      return true;
    } else return false;
  }
}
