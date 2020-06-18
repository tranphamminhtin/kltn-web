import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'DHSPKT';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getIsLogin(): Boolean {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token'))
      return true;
    return false;
  }
}
