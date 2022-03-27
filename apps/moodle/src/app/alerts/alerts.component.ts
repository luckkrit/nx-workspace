import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { tap } from 'rxjs';
import { AlertsStore, AlertsType } from '../store/alerts-store';

@Component({
  selector: 'nx-workspace-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  @Input()
  header = '';
  @Input()
  message: string | null = '';
  @Input()
  timeOut = 3000;
  @Input()
  isShow: boolean | null = false;
  @Input()
  type = AlertsType.ALERT_LIGHT;
  @Output()
  isClose = new EventEmitter<boolean>();

  toggleAlerts$ = this.alertsStore.toggleAlerts$;
  message$ = this.alertsStore.message$;
  header$ = this.alertsStore.header$;
  isShow$ = this.alertsStore.isShow$.pipe(
    tap((isShow) => {
      if (isShow == false) {
        this.isClose.emit(isShow == false);
      }
    })
  );
  constructor(private alertsStore: AlertsStore) {}
  ngOnInit(): void {
    this.alertsStore.showAlert({
      header: this.header,
      message: this.message || '',
      timeOut: this.timeOut,
      isShow: this.isShow || false,
      type: this.type,
    });
  }

  onClose(): void {
    this.alertsStore.hideAlert();
  }
}
