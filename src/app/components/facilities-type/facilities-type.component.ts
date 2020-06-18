import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacilitiesType } from 'src/app/models/facilities-type.model';
import { Subscription } from 'rxjs';
import { FacilitiesTypeService } from 'src/app/services/facilities-type.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-facilities-type',
  templateUrl: './facilities-type.component.html',
  styleUrls: ['./facilities-type.component.css']
})
export class FacilitiesTypeComponent implements OnInit, OnDestroy {

  name = '';
  arrAmounts = [{ _id: 1, size: 20, amount: 1 }];
  arrTypes: FacilitiesType[] = [];
  subscriptions: Subscription[] = [];

  constructor(private typeService: FacilitiesTypeService, private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchData() {
    const sub = this.typeService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrTypes = res['message'];
        this.arrTypes.sort(this.sortByName);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
  }

  create(name) {
    const sub = this.typeService.create(name).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrTypes.unshift(res['message']);
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
    const sub = this.typeService.update({ _id, name }).subscribe(res => {
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
    const sub = this.typeService.remove(_id).subscribe(res => {
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
      const index = this.arrTypes.findIndex(r => r._id === _id);
      this.arrTypes.splice(index, 1);
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
