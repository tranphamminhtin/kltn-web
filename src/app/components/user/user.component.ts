import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UnitService } from 'src/app/services/unit.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/models/unit.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  // arrUsers: Manager[];
  arrUsers: User[] = [];
  arrFilters: User[] = [];
  arrUnits: Unit[] = [];
  subscriptions: Subscription[] = [];
  stateShow: number;

  constructor(private userService: UserService, private unitService: UnitService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.stateShow = 0;
    this.fetchUser();
    this.fetchUnit();
    // this.arrUsers = [
    //   { _id: '1', name: 'asd', username: 'username', unit: 'unit', gender: 0, address: 'add', numberphone: '123', email: 'emia' }
    // ];
    // this.user = { _id: '123', right: 23232, username: 'asd' };
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  remove(email) {
    const sub = this.userService.remove(email).subscribe(res => {
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
      const index = this.arrUsers.findIndex(user => user.email === email);
      this.arrUsers.splice(index, 1);
      const i = this.arrFilters.findIndex(user => user.email === email);
      this.arrFilters.splice(i, 1);
      this.notificationService.showSuccess('Xóa thành công');
    });
  }

  update(user) {
    const sub = this.userService.update(user).subscribe(res => {
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
      const index = this.arrUsers.findIndex(u => u.email === user.email);
      this.arrUsers[index] = user;
      this.filter();
      this.notificationService.showSuccess('Sửa thành công');
    });
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
        this.arrUsers.sort(this.sortByEmail);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.filter();
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

  show(name: number) {
    this.stateShow = name;
    this.filter();
  }

  filter() {
    // console.log(this.arrUsers);
    const arr = [...this.arrUsers.map(user => ({ ...user }))];
    this.arrFilters = arr.filter(user => user.right == this.stateShow);
    // console.log(this.arrFilters);
  }

  getNameUnit(_id) {
    if (this.arrUnits.length > 0) {
      const name = this.arrUnits.find(unit => unit._id === _id).name;
      if (name)
        return name;
      else return '';
    } else return '';
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

  sortByEmail(a, b) {
    var emailA = a.email.toUpperCase(); // bỏ qua hoa thường
    var emailB = b.email.toUpperCase();
    if (emailA < emailB) {
      return -1;
    }
    if (emailA > emailB) {
      return 1;
    }

    return 0;
  }
}
