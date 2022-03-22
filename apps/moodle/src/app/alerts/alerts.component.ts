import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EMPTY, map, mergeMap, Observable, timeout } from 'rxjs';
import { AlertsStore, AlertsType } from '../store/alerts-store';

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
  constructor(private alertsStore: AlertsStore) { }
  ngOnInit(): void {
  }

  onClose(): void {
    this.alertsStore.hideAlert();
  }
  classCondition(): Observable<any> {
    return this.isShow$.pipe(mergeMap((isShow) => this.type$.pipe(map((type) => ({
      'show': isShow,
      [AlertsType.ALERT_DANGER]: AlertsType.ALERT_DANGER == type,
      [AlertsType.ALERT_DARK]: AlertsType.ALERT_DARK == type,
      [AlertsType.ALERT_INFO]: AlertsType.ALERT_INFO == type,
      [AlertsType.ALERT_LIGHT]: AlertsType.ALERT_LIGHT == type,
      [AlertsType.ALERT_PRIMARY]: AlertsType.ALERT_PRIMARY == type,
      [AlertsType.ALERT_SECONDARY]: AlertsType.ALERT_SECONDARY == type,
      [AlertsType.ALERT_SUCCESS]: AlertsType.ALERT_SUCCESS == type,
      [AlertsType.ALERT_WARNING]: AlertsType.ALERT_WARNING == type
    })))), timeout({
      each: 5000,
      with: () => {
        this.alertsStore.hideAlert()
        return EMPTY
      }
    }))
  }
}
