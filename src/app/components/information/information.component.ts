import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { onlyLetterValidator, confirmPassValidator, emailValidator, numberPhoneValidator } from 'src/app/validators/validator';
import { UserService } from 'src/app/services/user.service';
import { UnitService } from 'src/app/services/unit.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Unit } from 'src/app/models/unit.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {

  formInfo: FormGroup;
  formPassword: FormGroup;
  subscriptions: Subscription[] = [];
  user: User;
  unit: Unit;

  constructor(private fb: FormBuilder, private userService: UserService, private unitService: UnitService,
    private notificationService: NotificationService) {
    this.formInfo = this.fb.group({
      email: [{ value: 'asd@gmail.com', disabled: true }],
      name: [{ value: 'name', disabled: true }],
      gender: [{ value: 1, disabled: true }],
      unit: [{ value: 'unit', disabled: true }],
      address: ['address', [Validators.required]],
      numberphone: ['0987654321', [Validators.required, numberPhoneValidator]],
    });

    this.formPassword = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, confirmPassValidator]],
    });
    this.formPassword.controls.password.valueChanges
      .subscribe(
        x => this.formPassword.controls.password2.updateValueAndValidity()
      )
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmitInfo() {
    if (this.formInfo.valid) {
      for (var key in this.formInfo.value) {
        this.user[key] = this.formInfo.get(key).value;
      }
      this.updateInfo();
    }
    else {
      this.formInfo.markAllAsTouched();
    }
  }

  onSubmitPassword() {
    if (this.formPassword.valid) {
      console.log(this.formPassword.value);
      this.changePassword();
    }
    else {
      this.formPassword.markAllAsTouched();
    }
  }

  updateInfo() {
    const sub = this.userService.update(this.user).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.notificationService.showSuccess('Sửa thành công');
    });
  }

  changePassword() {
    const sub = this.userService.changePassword(this.user.email, this.formPassword.value)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.notificationService.showError(res['message']);
          this.formPassword.get('oldpassword').reset();
          // this.router.navigate(['/login']);
        }
      }, err => {
        console.log(err);
        this.notificationService.showError(err);
      }, () => {
        this.subscriptions.push(sub);
        this.notificationService.showSuccess('Đổi mật khẩu thành công');
        this.formPassword.reset();
      });
  }

  getUser() {
    const email = localStorage.getItem('email');
    const sub = this.userService.get(email).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.user = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.setValueFormInfo();
    });
  }

  setValueFormInfo() {
    for (var key in this.formInfo.controls) {
      this.formInfo.get(key).setValue(this.user[key]);
    }
    this.getNameUnit(this.user.unit);
  }

  getNameUnit(_id) {
    const sub = this.unitService.get(_id).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.unit = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.formInfo.get('unit').setValue(this.unit.name);
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
