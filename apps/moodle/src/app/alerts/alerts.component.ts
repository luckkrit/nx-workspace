import { Component, OnInit } from '@angular/core';
import { AlertsStore } from '../store/alerts-store';

@Component({
  selector: 'nx-workspace-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  header$ = this.alertsStore.header$;
  message$ = this.alertsStore.message$;
  isShow$ = this.alertsStore.isShow$;
  type$ = this.alertsStore.type$;
  toggleAlerts$ = this.alertsStore.toggleAlerts$;
  timeOut$ = this.alertsStore.timeOut$;
  constructor(private alertsStore: AlertsStore) {}
  ngOnInit(): void {}

  onClose(): void {
    this.alertsStore.hideAlert();
  }
}
