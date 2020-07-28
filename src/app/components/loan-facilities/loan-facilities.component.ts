import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { RoomService } from 'src/app/services/room.service';
import { UnitService } from 'src/app/services/unit.service';
import { UserService } from 'src/app/services/user.service';
import { VoteService } from 'src/app/services/vote.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LoanFacilitiesService } from 'src/app/services/loan-facilities.service';
import { LoanFacilities } from 'src/app/models/loan-facilities.model';
import { Facilities } from 'src/app/models/facilities.model';
import { Room } from 'src/app/models/room.model';
import { Unit } from 'src/app/models/unit.model';
import { User } from 'src/app/models/user.model';
import { Vote } from 'src/app/models/vote.model';

@Component({
  selector: 'app-loan-facilities',
  templateUrl: './loan-facilities.component.html',
  styleUrls: ['./loan-facilities.component.css']
})
export class LoanFacilitiesComponent implements OnInit, OnDestroy {

  arrLoanFacilities: LoanFacilities[] = [];
  arrFacilities: Facilities[] = [];
  arrRooms: Room[] = [];
  arrUnits: Unit[] = [];
  arrUsers: User[] = [];
  arrUsersFilter: User[] = [];
  arrVotes: Vote[] = [];
  arrFilters: LoanFacilities[] = [];
  arrRights = ['ADMIN', 'MANAGER'];
  arrStateShow = ['YEUCAU', 'CAPPHAT', 'THUHOI'];
  // right = this.arrRights[0];
  right = this.arrRights[JSON.parse(localStorage.getItem('right'))];
  stateShow = this.arrStateShow[0];
  filterRoom = "";
  filterUnit = "";
  filterUser = "";
  filterFacilities = "";
  subscriptions: Subscription[] = [];

  constructor(private loanFacilitiesService: LoanFacilitiesService, private facilitiesService: FacilitiesService,
    private roomService: RoomService, private unitService: UnitService, private userService: UserService,
    private voteService: VoteService, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.fetchLoanFacilities();
    this.fetchFacilities();
    this.fetchRoom();
    this.fetchUnit();
    this.fetchUser();
    this.fetchVote();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchLoanFacilities() {
    const sub = this.loanFacilitiesService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrLoanFacilities = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.filter();
    });
  }

  fetchFacilities() {
    const sub = this.facilitiesService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrFacilities = res['message'];
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
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
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
        this.arrUsersFilter = this.arrUsers.filter(user => user.right === 1);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
  }

  fetchVote() {
    const sub = this.voteService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrVotes = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => this.subscriptions.push(sub));
  }

  getNameFacilities(_id) {
    const facilities = this.arrFacilities.find(f => f._id === _id);
    if (facilities)
      return facilities.name;
    return '';
  }

  getNameRoom(_id) {
    const room = this.arrRooms.find(r => r._id === _id);
    if (room)
      return room.name;
    return '';
  }

  getNameUnit(_id) {
    const unit = this.arrUnits.find(u => u._id === _id);
    if (unit)
      return unit.name;
    return '';
  }

  getVote(idLoan) {
    const arr = [...this.arrVotes.map(vote => ({ ...vote }))];
    const votes = arr.filter(vote => vote.loanFacilities == idLoan);
    if (votes.length === 0)
      return 100;
    let sum = 0;
    votes.forEach(v => {
      sum += v.percent.valueOf();
    })
    if (sum !== 0)
      return sum / votes.length;
    return 100;
  }

  getNameUser(email) {
    const user = this.arrUsers.find(u => u.email === email);
    if (user)
      return user.name;
    return '';
  }

  show(name) {
    this.stateShow = name;
    this.filter();
  }

  loan(_id) {
    const fa = this.arrLoanFacilities.find(f => f._id === _id);
    const facilities = this.arrFilters.find(f => f._id === _id)
    if (fa) {
      if (this.right === this.arrRights[0]) {
        fa.request = false;
        facilities.request = false;
      } else {
        fa.request = true;
        facilities.request = true;
      }
      fa.state = 0;
      fa.to = facilities.to;
      facilities.state = 0;
      this.update(_id, facilities, 'Cấp phát');
    }
  }

  revoke(_id) {
    const fa = this.arrLoanFacilities.find(f => f._id === _id);
    if (fa) {
      fa.state = 1;
      this.update(_id, fa, 'Thu hồi');
    }
  }

  filter() {
    const arr = [...this.arrLoanFacilities.map(fa => ({ ...fa }))];
    switch (this.stateShow) {
      case this.arrStateShow[0]:
        this.arrFilters = arr.filter(f => f.request === true && f.state === 0);
        break;
      case this.arrStateShow[1]:
        this.arrFilters = arr.filter(f => f.state === 0 && f.request === false);
        break;
      case this.arrStateShow[2]:
        this.arrFilters = arr.filter(f => f.state === 1 && f.request === false);
        break;
      default: break;
    }
    if (this.filterRoom !== "")
      this.arrFilters = this.arrFilters.filter(f => f.room === this.filterRoom);
    if (this.filterUnit !== "")
      this.arrFilters = this.arrFilters.filter(f => f.unit === this.filterUnit);
    if (this.filterUser !== "")
      this.arrFilters = this.arrFilters.filter(f => f.manager === this.filterUser);
    if (this.filterFacilities !== "")
      this.arrFilters = this.arrFilters.filter(f => f.facilities === this.filterFacilities);
    this.arrFilters.sort(this.sortById);
  }

  update(_id, value, state) {
    const sub = this.loanFacilitiesService.update(_id, value).subscribe(res => {
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
      this.filter();
      this.notificationService.showSuccess(state + ' thành công');
    });
  }

  remove(_id) {
    const sub = this.loanFacilitiesService.remove(_id).subscribe(res => {
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
      const index = this.arrFilters.findIndex(fa => fa._id === _id);
      this.arrFilters.splice(index, 1);
      this.notificationService.showSuccess('Xóa thành công');
    });
  }

  changeRoom(idRoom) {
    this.filterRoom = idRoom;
    this.filter();
  }

  changeUnit(idUnit) {
    this.filterUnit = idUnit;
    if (idUnit !== "") {
      const arr = [...this.arrUsers.map(user => ({ ...user }))];
      this.arrUsersFilter = arr.filter(user => user.right === 1 && user.unit == idUnit);
      this.filterUser = "";
    }
    this.filter();
  }

  changeUser(email) {
    this.filterUser = email;
    if (email !== "")
      this.filter();
  }

  changeFacilities(idFacilities) {
    this.filterFacilities = idFacilities;
    this.filter();
  }

  sortById(a, b) {
    var idA = a._id; // bỏ qua hoa thường
    var idB = b._id;
    if (idA < idB) {
      return -1;
    }
    if (idA > idB) {
      return 1;
    }
    return 0;
  }

  print() {
    window.print();
  }
}
