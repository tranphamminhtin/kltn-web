import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/services/unit.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit, OnDestroy {

  name = '';
  arrUnits: Unit[] = [];
  subscriptions: Subscription[] = [];

  constructor(private unitService: UnitService, private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchData() {
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

  create(name) {
    const sub = this.unitService.create(name).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrUnits.unshift(res['message']);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError('Thêm thất bại');
    }, () => {
      this.subscriptions.push(sub);
      this.notificationService.showSuccess('Thêm thành công');
      this.name = '';
    });
  }

  update(_id, name) {
    const sub = this.unitService.update({ _id, name }).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError('Sửa thất bại');
    }, () => {
      this.subscriptions.push(sub);
      // const index = this.arrRoom.findIndex(r => r._id === _id);
      // this.arrRoom[index].name = name;
      this.notificationService.showSuccess('Sửa thành công');
    });
  }

  remove(_id) {
    const sub = this.unitService.remove(_id).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError('Xóa thất bại');
    }, () => {
      this.subscriptions.push(sub);
      const index = this.arrUnits.findIndex(r => r._id === _id);
      this.arrUnits.splice(index, 1);
      this.notificationService.showSuccess('Xóa thành công');
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
