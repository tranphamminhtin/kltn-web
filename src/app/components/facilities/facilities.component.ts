import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { FacilitiesTypeService } from 'src/app/services/facilities-type.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FacilitiesType } from 'src/app/models/facilities-type.model';
import { Facilities } from 'src/app/models/facilities.model';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit, OnDestroy {


  arrFacilities: Facilities[] = [];
  arrFilters: Facilities[] = [];
  arrTypes: FacilitiesType[] = [];
  arrRights = ['ADMIN', 'MANAGER'];
  filterType = "";
  // right = this.arrRights[0];
  right = this.arrRights[JSON.parse(localStorage.getItem('right'))];
  subscriptions: Subscription[] = [];

  constructor(private facilitiesService: FacilitiesService, private typeService: FacilitiesTypeService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getArrType();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  remove(_id) {
    const sub = this.facilitiesService.remove(_id).subscribe(res => {
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
      const index = this.arrFacilities.findIndex(fa => fa._id === _id);
      this.arrFacilities.splice(index, 1);
      this.notificationService.showSuccess('Xóa thành công');
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
        this.arrFilters = res['message'];
        this.arrFilters.sort(this.sortByName);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.arrFilters.sort(this.sortByName);
    });
  }

  getNameType(_id) {
    const type = this.arrTypes.find(t => t._id === _id);
    if (type)
      return type.name;
    return '';
  }

  getArrType() {
    const sub = this.typeService.getList().subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError(res['message']);
        // this.router.navigate(['/login']);
      } else {
        this.arrTypes = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.fetchFacilities();
    });
  }

  changeType(idType) {
    this.filterType = idType;
    const arr = [...this.arrFacilities.map(fa => ({ ...fa }))];
    if (idType !== null) {
      this.arrFilters = arr.filter(fa => fa.type === idType);
    } else {
      this.arrFilters = arr.filter(fa => 1 === 1);
    }
    this.arrFilters.sort(this.sortByName);
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
