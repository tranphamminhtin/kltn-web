import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Right } from 'src/app/models/user.model';
import { Room } from 'src/app/models/room.model';
import { Unit } from 'src/app/models/unit.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { LoanFacilitiesService } from 'src/app/services/loan-facilities.service';
import { RoomService } from 'src/app/services/room.service';
import { UnitService } from 'src/app/services/unit.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { formatDate } from '@angular/common';
import { LoanFacilities } from 'src/app/models/loan-facilities.model';

@Component({
  selector: 'app-loan-facilities-update',
  templateUrl: './loan-facilities-update.component.html',
  styleUrls: ['./loan-facilities-update.component.css']
})
export class LoanFacilitiesUpdateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id = '';
  right;
  imgQR = '';
  loanFacilities: LoanFacilities;
  arrUsers: User[] = [];
  arrUsersFilters: User[] = [];
  arrRooms: Room[] = [];
  arrUnits: Unit[] = [];
  subscriptions: Subscription[] = [];
  QRObject = {
    name: '',
    room: ''
  };

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private facilitiesService: FacilitiesService, private loanService: LoanFacilitiesService,
    private userService: UserService, private roomService: RoomService, private unitService: UnitService,
    private notificationService: NotificationService) {
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }],
      facilities: [{ value: '', disabled: true }],
      unit: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      room: ['', [Validators.required]],
      from: [formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'), [Validators.required]],
      to: [formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'), [Validators.required]],
      image: [{ value: '', disabled: true }],
      state: [, [Validators.required]],
      note: [''],
      request: [, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    this.right = Right.Admin;
    if (this.right == Right.Admin) {
      this.getLoanFacilities();
      this.fetchUser();
      this.fetchRoom();
      this.fetchUnit();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.update();
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  update() {
    const sub = this.loanService.update(this.id, this.form.value).subscribe(res => {
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

  getLoanFacilities() {
    const sub = this.loanService.get(this.id).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.setValueForm(res['message']);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.getFacilities();
    });
  }

  getFacilities() {
    const sub = this.facilitiesService.get(this.form.get('facilities').value)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.notificationService.showError(res['message']);
          // this.router.navigate(['/login']);
        } else {
          this.form.get('name').setValue(res['message'].name);
          // this.QRObject.name = res['message'].name;
          this.form.get('image').setValue(res['message'].image);
        }
      }, err => {
        console.log(err);
        this.notificationService.showError(err);
      }, () => this.subscriptions.push(sub));
  }

  setValueForm(object) {
    for (var key in object) {
      if (this.form.get(key)) {
        if (key !== 'from' && key !== 'to')
          this.form.get(key).setValue(object[key]);
      }
    }
    this.form.get('from').setValue(formatDate(object['from'], 'yyyy-MM-dd', 'en'));
    this.form.get('to').setValue(formatDate(object['to'], 'yyyy-MM-dd', 'en'));
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
  }

  changeUser(emailUser) {
    const user = this.arrUsersFilters.find(user => user.email === emailUser);
    if (user) {
      this.form.get('unit').setValue(user.unit);
      const arr = [...this.arrUsers.map(user => ({ ...user }))];
      this.arrUsersFilters = arr.filter(u => u.right == Right.Manager && u.unit == user.unit);
    }
  }

  filterUser() {
    const arr = [...this.arrUsers.map(user => ({ ...user }))];
    this.arrUsersFilters = arr.filter(user => user.right == Right.Manager && user.unit == this.form.get('unit').value);
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

  printQR() {
    const roomId = this.form.get('room').value;
    const index = this.arrRooms.findIndex(room => room._id === roomId);
    this.QRObject.room = this.arrRooms[index].name;
    this.QRObject.name = this.form.get('name').value;
    setTimeout(() => {
      window.print();
    }, 500);
  }
}
