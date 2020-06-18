import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VoteService } from 'src/app/services/vote.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Vote } from 'src/app/models/vote.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {

  idLoan = '';
  arrVotes: Vote[] = [];
  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private voteService: VoteService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.idLoan = this.activatedRoute.snapshot.paramMap.get('id').toString();
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchData() {
    const sub = this.voteService.getListByIdLoan(this.idLoan)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.notificationService.showError(res['message']);
        } else {
          this.arrVotes = res['message'];
        }
      }, err => {
        console.log(err);
        this.notificationService.showError(err);
      }, () => this.subscriptions.push(sub));
  }

  remove(_id) {
    const sub = this.voteService.remove(_id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.notificationService.showError(res['message']);
        }
      }, err => {
        console.log(err);
        this.notificationService.showError(err);
      }, () => {
        this.subscriptions.push(sub);
        this.notificationService.showSuccess('Xóa thành công');
      });
  }
}
