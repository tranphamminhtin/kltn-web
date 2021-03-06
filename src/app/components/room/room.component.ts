import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  name = '';
  arrRooms: Room[] = [];
  subscriptions: Subscription[] = [];
  constructor(private roomService: RoomService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchData() {
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

  create(name) {
    const sub = this.roomService.create(name).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrRooms.unshift(res['message']);
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
    const sub = this.roomService.update({ _id, name }).subscribe(res => {
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
    const sub = this.roomService.remove(_id).subscribe(res => {
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
      const index = this.arrRooms.findIndex(r => r._id === _id);
      this.arrRooms.splice(index, 1);
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
