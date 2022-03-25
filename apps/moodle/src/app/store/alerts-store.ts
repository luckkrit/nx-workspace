import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatMap, EMPTY, Observable, switchMap, timeout } from 'rxjs';

export enum AlertsType {
  ALERT_PRIMARY = 'alert-primary',
  ALERT_SECONDARY = 'alert-secondary',
  ALERT_SUCCESS = 'alert-success',
  ALERT_DANGER = 'alert-danger',
  ALERT_WARNING = 'alert-warning',
  ALERT_INFO = 'alert-info',
  ALERT_LIGHT = 'alert-light',
  ALERT_DARK = 'alert-dark',
}
export interface AlertsState {
  type: AlertsType;
  header: string;
  message: string;
  isShow: boolean;
  timeOut: number;
}
export type ToggleAlertsState = {
  show: boolean;
  'alert-danger': boolean;
  'alert-dark': boolean;
  'alert-info': boolean;
  'alert-light': boolean;
  'alert-primary': boolean;
  'alert-secondary': boolean;
  'alert-success': boolean;
  'alert-warning': boolean;
};

@Injectable()
export class AlertsStore extends ComponentStore<AlertsState> {
  readonly type$ = this.select((state) => state.type);
  readonly isShow$ = this.select((state) => state.isShow);
  readonly timeOut$ = this.select((state) => state.timeOut);
  readonly message$ = this.select((state) => state.message);
  readonly header$ = this.select((state) => state.header);
  readonly toggleAlerts$ = this.select(
    this.isShow$,
    this.type$,
    (isShow, type) => {
      return {
        show: isShow,
        [AlertsType.ALERT_DANGER]: AlertsType.ALERT_DANGER == type,
        [AlertsType.ALERT_DARK]: AlertsType.ALERT_DARK == type,
        [AlertsType.ALERT_INFO]: AlertsType.ALERT_INFO == type,
        [AlertsType.ALERT_LIGHT]: AlertsType.ALERT_LIGHT == type,
        [AlertsType.ALERT_PRIMARY]: AlertsType.ALERT_PRIMARY == type,
        [AlertsType.ALERT_SECONDARY]: AlertsType.ALERT_SECONDARY == type,
        [AlertsType.ALERT_SUCCESS]: AlertsType.ALERT_SUCCESS == type,
        [AlertsType.ALERT_WARNING]: AlertsType.ALERT_WARNING == type,
      };
    }
  );

  constructor() {
    super({
      type: AlertsType.ALERT_LIGHT,
      header: '',
      message: '',
      isShow: false,
      timeOut: 5000,
    });
  }
  readonly hideAlert = () =>
    this.patchState({
      isShow: false,
      header: '',
      message: '',
      type: AlertsType.ALERT_LIGHT,
      timeOut: 5000,
    });

  readonly showAlert = this.effect((state$: Observable<AlertsState>) =>
    state$.pipe(
      concatMap((state) => {
        this.patchState(state);
        const { timeOut } = state;
        console.log(state);
        if (timeOut > 0) {
          return this.toggleAlerts$.pipe(
            timeout({
              each: timeOut,
              with: () => {
                this.hideAlert();
                return EMPTY;
              },
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );
}
