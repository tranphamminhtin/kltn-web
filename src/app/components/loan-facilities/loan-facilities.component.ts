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
import { LoanFacilitiesViewModel } from 'src/app/models/loan.viewmodel';

@Component({
  selector: 'app-loan-facilities',
  templateUrl: './loan-facilities.component.html',
  styleUrls: ['./loan-facilities.component.css']
})
export class LoanFacilitiesComponent implements OnInit, OnDestroy {

  arrLoanFacilities: LoanFacilitiesViewModel[] = [];
  arrFacilities: Facilities[] = [];
  arrRooms: Room[] = [];
  arrUnits: Unit[] = [];
  arrUsers: User[] = [];
  arrUsersFilter: User[] = [];
  arrVotes: Vote[] = [];
  arrFilters: LoanFacilitiesViewModel[] = [];
  arrRights = ['ADMIN', 'MANAGER'];
  arrStateShow = ['YEUCAU', 'CAPPHAT', 'THUHOI'];
  arrPercent = [
    { value: 0, label: 'Tình trạng' },
    { value: 1, label: '≥70%' },
    { value: 2, label: '50% - 70%' },
    { value: 3, label: '30%-50%' },
    { value: 4, label: '≤30%' }
  ];
  // right = this.arrRights[0];
  right = this.arrRights[JSON.parse(localStorage.getItem('right'))];
  email = localStorage.getItem('email');
  stateShow = this.arrStateShow[0];
  filterRoom = "";
  filterUnit = "";
  filterUser = "";
  filterFacilities = "";
  filterPercent = 0;
  filterFromDateFrom: Date = null;
  filterFromDateTo: Date = null;
  filterToDateFrom: Date = null;
  filterToDateTo: Date = null;
  subscriptions: Subscription[] = [];
  typePrint = ['Table', 'QR'];
  printClass = this.typePrint[0];

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
        if (this.right === this.arrRights[1]) {
          this.arrLoanFacilities = this.arrLoanFacilities.filter(f => f.manager === this.email);
        }
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
    let loan = this.arrLoanFacilities.find(l => l.facilities === _id);
    if (facilities) {
      loan.name = facilities.name;
      return facilities.name;
    }
    return '';
  }

  getNameRoom(_id) {
    const room = this.arrRooms.find(r => r._id === _id);
    let loan = this.arrLoanFacilities.find(l => l.room === _id);
    if (room) {
      loan.nameRoom = room.name;
      return room.name;
    }
    return '';
  }

  getNameUnit(_id) {
    const unit = this.arrUnits.find(u => u._id === _id);
    let loan = this.arrLoanFacilities.find(l => l.unit === _id);
    if (unit) {
      loan.nameUnit = unit.name;
      return unit.name;
    }
    return '';
  }

  getVote(idLoan) {
    const arr = [...this.arrVotes.map(vote => ({ ...vote }))];
    const vote = arr.find(vote => vote.loanFacilities == idLoan);
    let loan = this.arrLoanFacilities.find(l => l._id === idLoan);
    if (!vote) {
      loan.percent = 100;
      return 100;
    }
    let sum = vote?.percent.valueOf();

    if (sum !== 0) {
      loan.percent = sum;
      return sum;
    }
    loan.percent = 100;
    return 100;
  }

  getComment(idLoan) {
    const arr = [...this.arrVotes.map(vote => ({ ...vote }))];
    const vote = arr.find(vote => vote.loanFacilities == idLoan);
    let loan = this.arrLoanFacilities.find(l => l._id === idLoan);
    if (vote?.note) {
      loan.comment = vote.note;
    }
    return loan.comment;
  }

  getNameUser(email) {
    const user = this.arrUsers.find(u => u.email === email);
    let loan = this.arrLoanFacilities.find(l => l.manager === email);
    if (user) {
      loan.nameUser = user.name;
      return user.name;
    }
    return '';
  }

  show(name) {
    this.stateShow = name;
    this.filter();
  }

  loan(_id) {
    let fa = this.arrLoanFacilities.find(f => f._id === _id);
    let facilities = this.arrFilters.find(f => f._id === _id)
    if (fa) {
      if (this.right === this.arrRights[0]) {
        fa.from = new Date(Date.now());
        facilities.from = new Date(Date.now());
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
    let fa = this.arrLoanFacilities.find(f => f._id === _id);
    if (fa) {
      fa.state = 1;
      fa.to = new Date(Date.now());
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

    if (this.filterFromDateFrom !== null)
      this.arrFilters = this.arrFilters.filter(f => new Date(f.from).getTime() >= new Date(this.filterFromDateFrom).getTime());
    if (this.filterFromDateTo !== null)
      this.arrFilters = this.arrFilters.filter(f => new Date(f.from).getTime() <= new Date(this.filterFromDateTo).getTime());
    if (this.filterToDateFrom !== null)
      this.arrFilters = this.arrFilters.filter(f => new Date(f.to).getTime() >= new Date(this.filterToDateFrom).getTime());
    if (this.filterToDateTo !== null)
      this.arrFilters = this.arrFilters.filter(f => new Date(f.to).getTime() <= new Date(this.filterToDateTo).getTime());

    switch (this.filterPercent) {
      case 0: break;
      case 1: {
        this.arrFilters = this.arrFilters.filter(f => f.percent === null || f.percent >= 70);
        break;
      }
      case 2: {
        this.arrFilters = this.arrFilters.filter(f => f.percent === null || (f.percent >= 50 && f.percent <= 70));
        break;
      }
      case 3: {
        this.arrFilters = this.arrFilters.filter(f => f.percent === null || (f.percent >= 30 && f.percent <= 50));
        break;
      }
      case 4: {
        this.arrFilters = this.arrFilters.filter(f => f.percent === null || f.percent <= 30);
        break;
      }
      default: break;
    }
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

  changePercent(value) {
    this.filterPercent = Number(value);
    this.filter();
  }

  changeDate(date: Date, type: number) {
    if (type == 1)
      this.filterFromDateFrom = date;
    if (type == 2)
      this.filterFromDateTo = date;
    if (type == 3)
      this.filterToDateFrom = date;
    if (type == 4)
      this.filterToDateTo = date;
    if (date != null)
      this.filter();
  }

  resetDate() {
    this.filterFromDateFrom = null;
    this.filterFromDateTo = null;
    this.filterToDateFrom = null;
    this.filterToDateTo = null;
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
    this.printClass = this.typePrint[0];
    setTimeout(() => window.print(), 500);
  }

  printQR() {
    this.printClass = this.typePrint[1];
    setTimeout(() => window.print(), 500);
  }
}
