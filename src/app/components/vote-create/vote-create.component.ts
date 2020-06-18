import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Vote } from 'src/app/models/vote.model';
import { LoanFacilitiesService } from 'src/app/services/loan-facilities.service';

@Component({
  selector: 'app-vote-create',
  templateUrl: './vote-create.component.html',
  styleUrls: ['./vote-create.component.css']
})
export class VoteCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  idLoan = '';
  subscriptions: Subscription[] = [];
  arrVotes: Vote[] = [];
  email = 'tranphamminhtin@gmail.com';
  arrState = ['CREATE', 'UPDATE'];
  state = this.arrState[0];
  id = '';

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private voteService: VoteService, private loanService: LoanFacilitiesService,
    private notificationService: NotificationService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      loanFacilities: ['', [Validators.required]],
      percent: [100, [Validators.required, Validators.min(1), Validators.max(100)]],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.idLoan = this.activatedRoute.snapshot.paramMap.get('id').toString();
    this.checkIdLoan();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.state === this.arrState[0]) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    const sub = this.voteService.create(this.form.value).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError('Lỗi rồi');
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.notificationService.showSuccess('Đánh giá thành công');
    });
  }

  update() {
    const sub = this.voteService.update(this.id, this.form.value).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError('Lỗi rồi');
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.notificationService.showSuccess('Đánh giá thành công');
    });
  }

  checkIdLoan() {
    const sub = this.voteService.getListByIdLoan(this.idLoan).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showInfor('Không tìm thấy thiết bị');
        this.router.navigate(['/cap-phat']);
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.setVote();
    });
  }

  setVote() {
    this.form.get('loanFacilities').setValue(this.idLoan);
    this.form.get('email').setValue('tranphamminhtin@gmail.com');
    this.getVotesByIdLoan();
  }

  getVotesByIdLoan() {
    const sub = this.voteService.getListByIdLoan(this.idLoan).subscribe(res => {
      if (!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        this.notificationService.showError('Lỗi rồi');
      } else {
        this.arrVotes = res['message'];
      }
    }, err => {
      console.log(err);
      this.notificationService.showError(err);
    }, () => {
      this.subscriptions.push(sub);
      this.checkExist();
    });
  }

  checkExist() {
    const vote = this.arrVotes.find(v => v.email === this.email);
    if (vote) {
      this.state = this.arrState[1];
      this.id = vote._id;
      this.form.get('percent').setValue(vote.percent);
      this.form.get('note').setValue(vote.note);
    } else {
      this.state = this.arrState[0];
    }
  }
}
