import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { LoanFacilitiesService } from 'src/app/services/loan-facilities.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { RoomService } from 'src/app/services/room.service';
import { UnitService } from 'src/app/services/unit.service';
import { User, Right } from 'src/app/models/user.model';
import { Room } from 'src/app/models/room.model';
import { Unit } from 'src/app/models/unit.model';

@Component({
  selector: 'app-loan-facilities-create',
  templateUrl: './loan-facilities-create.component.html',
  styleUrls: ['./loan-facilities-create.component.css']
})
export class LoanFacilitiesCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id = '';
  right;
  arrUsers: User[] = [];
  arrUsersFilters: User[] = [];
  arrRooms: Room[] = [];
  arrUnits: Unit[] = [];
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private facilitiesService: FacilitiesService, private loanService: LoanFacilitiesService,
    private userService: UserService, private roomService: RoomService, private unitService: UnitService,
    private notificationService: NotificationService) {
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }],
      facilities: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      room: ['', [Validators.required]],
      from: [formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'), [Validators.required]],
      to: [formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'), [Validators.required]],
      image: [{ value: '', disabled: true }],
      note: [''],
      request: [false],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    this.getFacilities();
    this.fetchUser();
    this.fetchUnit();
    this.fetchRoom();
    this.right = JSON.parse(localStorage.getItem('right')) || Right.Admin;
    if (this.right == Right.Manager) {
      const email = localStorage.getItem('email');
      this.form.get('request').setValue(true);
      this.getUser(email);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      const interation = 0 + this.form.get('quantity').value;
      for (let i = 0; i < interation; i++) {
        this.create();
      }
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  create() {
    const sub = this.loanService.create(this.form.getRawValue()).subscribe(res => {
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
      this.notificationService.showSuccess('Thêm thành công');
    });
  }

  getFacilities() {
    const sub = this.facilitiesService.get(this.id).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.form.get('facilities').setValue(this.id);
        this.form.get('name').setValue(res['message'].name);
        this.form.get('image').setValue(res['message'].image);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
  }

  fetchUser() {
    const sub = this.userService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrUsers = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.filterUser();
    });
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

  fetchRoom() {
    const sub = this.roomService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrRooms = res['message'];
        this.arrRooms.sort(this.sortByName);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
  }

  changeUnit(idUnit) {
    const arr = [...this.arrUsers.map(user => ({ ...user }))];
    this.arrUsersFilters = arr.filter(user => user.right == Right.Manager && user.unit == idUnit);
    if (this.arrUsersFilters.length === 0) {
      this.form.get('manager').setValue('');
      return;
    }
    this.form.get('manager').setValue(this.arrUsersFilters[0].email);
  }

  changeUser(emailUser) {
    const user = this.arrUsersFilters.find(user => user.email === emailUser);
    if (user && user.unit !== this.form.get('unit').value) {
      this.form.get('unit').setValue(user.unit);
    }
  }

  filterUser() {
    const arr = [...this.arrUsers.map(user => ({ ...user }))];
    this.arrUsersFilters = arr.filter(user => user.right == Right.Manager);
  }

  getUser(email) {
    const sub = this.userService.get(email).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.form.get('manager').setValue(res['message'].email);
        this.form.get('manager').disable();
        this.form.get('unit').setValue(res['message'].unit);
        this.form.get('unit').disable();
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
    });
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
}
