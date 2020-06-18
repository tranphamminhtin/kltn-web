import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showInfor(message) {
    this.toastr.info(message);
  }

  showError(message) {
    this.toastr.error(message, 'Lỗi rồi');
  }
}
