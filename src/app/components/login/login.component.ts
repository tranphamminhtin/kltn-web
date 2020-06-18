import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { emailValidator } from 'src/app/validators/validator';
import { Subscription } from 'rxjs';
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  return = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
    private notificationService: NotificationService, private authService: AuthService,
    private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/information');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.login(this.form.value);
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  login(value) {
    const sub = this.userService.login(value).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError('Tên đăng nhập hoặc mật khẩu sai');
        this.form.get('password').reset();
      } else {
        this.notificationService.showSuccess('Đăng nhập thành công');
        this.setSession(res);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.router.navigate([this.return]);
    });
  }

  loginWithGG() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    if (sessionStorage.getItem('sociallogin'))
      this.authService.signOut();
    this.authService.signIn(socialPlatformProvider).then(socialUser => {
      const sub = this.userService.loginWithGG(socialUser)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            this.notificationService.showError(res['message']);
          } else {
            this.setSession(res);
          }
        }, err => {
          console.log(err);
          this.notificationService.showError(err);
        }, () => {
          this.subscriptions.push(sub);
        });
    });
  }

  setSession(res) {
    sessionStorage.setItem('email', res['email']);
    sessionStorage.setItem('right', res['right']);
    sessionStorage.setItem('token', res['token']);
    sessionStorage.setItem('isLogin', JSON.stringify(true));
  }
}
