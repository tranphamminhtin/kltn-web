import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { onlyLetterValidator, emailValidator, numberPhoneValidator } from 'src/app/validators/validator';
import { Unit } from 'src/app/models/unit.model';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { UnitService } from 'src/app/services/unit.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  arrUnits: Unit[] = [];
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private unitService: UnitService, private notificationService: NotificationService,
    private userService: UserService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, onlyLetterValidator]],
      gender: [1, [Validators.required]],
      unit: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      numberphone: ['0', [Validators.required, numberPhoneValidator]],
      right: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchUnit();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      const sub = this.userService.create(this.form.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            this.notificationService.showError(res['message']);
            // this.router.navigate(['/login']);
          } else {
            this.form.reset();
          }
        }, err => {
          console.log(err);
          this.notificationService.showError(err);
        }, () => {
          this.subscriptions.push(sub);
          this.notificationService.showSuccess('Tạo tài khoản thành công');
        });
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  fetchUnit() {
    const sub = this.unitService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrUnits = res['message'];
        this.arrUnits.sort(this.sortByName);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
  }

  sortByName(a, b) {
    var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
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
