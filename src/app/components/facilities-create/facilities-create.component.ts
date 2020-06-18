import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate, Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { FacilitiesTypeService } from 'src/app/services/facilities-type.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';
import { FacilitiesType } from 'src/app/models/facilities-type.model';

@Component({
  selector: 'app-facilities-create',
  templateUrl: './facilities-create.component.html',
  styleUrls: ['./facilities-create.component.css']
})
export class FacilitiesCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  arrTypes: FacilitiesType[] = [];
  show = '';
  id = '';
  subscriptions: Subscription[] = [];
  image;
  imgSrc = '';

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private location: Location,
    private facilitiesService: FacilitiesService, private typeService: FacilitiesTypeService,
    private notificationService: NotificationService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      date: [formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'), [Validators.required]],
      image: ['', [Validators.required]],
      note: [''],
      quantity: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.location.path().search('/them-thiet-bi') > -1) {
      this.show = 'CREATE';
    }
    else {
      this.show = 'UPDATE';
      this.form.get('date').disable();
      this.form.get('image').disable();
      this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
      this.getFacilities();
    }
    this.fetchType();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.show === 'CREATE') {
        this.create();
      } else {
        this.update();
      }
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  create() {
    const value = this.appendData();
    const sub = this.facilitiesService.create(value).subscribe(res => {
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
      this.form.reset();
      this.imgSrc = '';
    });
  }

  update() {
    const sub = this.facilitiesService.update(this.id, this.form.value).subscribe(res => {
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

  getFacilities() {
    const sub = this.facilitiesService.get(this.id).subscribe(res => {
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
    }, () => this.subscriptions.push(sub));
  }

  setValueForm(object) {
    this.form.get('note').setValue('');
    for (var key in this.form.controls) {
      this.form.get(key).setValue(object[key]);
    }
    this.form.get('date').setValue(formatDate(this.form.get('date').value, 'yyyy-MM-dd', 'en'));
    this.imgSrc = this.form.get('image').value;
  }

  fetchType() {
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

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  appendData() {
    const formData = new FormData();
    formData.append('image', this.image);
    for (var key in this.form.controls) {
      formData.append(key, this.form.get(key).value);
      console.log(key);
    }
    return formData;
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
