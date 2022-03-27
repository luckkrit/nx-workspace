import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsType } from '../store/alerts-store';
import { UserDetailStore } from '../store/user-detail-store';

@Component({
  selector: 'nx-workspace-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  isLoading$ = this.userDetailStore.isLoading$;
  isError$ = this.userDetailStore.isError$;
  isSuccess$ = this.userDetailStore.isSuccess$;
  error$ = this.userDetailStore.error$;
  username$ = this.userDetailStore.username$;
  name$ = this.userDetailStore.name$;
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  constructor(private userDetailStore: UserDetailStore) {}

  ngOnInit(): void {
    this.userDetailStore.getUserDetail();
  }
}
