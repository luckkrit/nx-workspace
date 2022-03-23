import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  concat,
  debounce,
  debounceTime,
  delayWhen,
  EMPTY,
  isObservable,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
  timeout,
  timer,
} from 'rxjs';

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
export interface ToggleAlertsState {
  show: boolean;
  'alert-danger': boolean;
  'alert-dark': boolean;
  'alert-info': boolean;
  'alert-light': boolean;
  'alert-primary': boolean;
  'alert-secondary': boolean;
  'alert-success': boolean;
  'alert-warning': boolean;
}
export interface AlertsContent {
  header: string;
  message$: Observable<string>;
}

@Injectable()
export class AlertsStore extends ComponentStore<AlertsState> {
  readonly type$ = this.select((state) => state.type);
  readonly header$ = this.select((state) => state.header);
  readonly message$ = this.select((state) => state.message);
  readonly isShow$ = this.select((state) => state.isShow);
  readonly timeOut$ = this.select((state) => state.timeOut);
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

  readonly showAlertPrimary = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_PRIMARY,
      header,
      message,
      isShow: true,
    });
  readonly showAlertSecondary = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_SECONDARY,
      header,
      message,
      isShow: true,
    });
  readonly showAlertSuccess = (
    message: string | Observable<string>,
    header: string,
    isShow: boolean | Observable<boolean>,
    timeOut: number
  ) =>
    this.showAlert({
      type: AlertsType.ALERT_SUCCESS,
      message,
      header,
      isShow,
      timeOut,
    });
  readonly showAlertDanger = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_DANGER,
      header,
      message,
      isShow: true,
    });
  readonly showAlertWarning = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_WARNING,
      header,
      message,
      isShow: true,
    });
  // readonly showAlertInfo = (message: string, header: string) =>
  //   this.patchState({
  //     type: AlertsType.ALERT_INFO,
  //     header,
  //     message,
  //     isShow: true,
  //   });
  readonly showAlertInfo = (
    message: string | Observable<string>,
    header: string,
    isShow: boolean | Observable<boolean>,
    timeOut: number
  ) =>
    this.showAlert({
      type: AlertsType.ALERT_INFO,
      message,
      header,
      isShow,
      timeOut,
    });
  readonly showAlertLight = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_LIGHT,
      header,
      message,
      isShow: true,
    });
  readonly showAlertDark = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_DARK,
      header,
      message,
      isShow: true,
    });
  readonly hideAlert = () => this.patchState({ isShow: false });
  private updateAlert = (state: AlertsState): Observable<ToggleAlertsState> => {
    this.patchState(state);
    if (state.timeOut > 0) {
      console.log(state.timeOut);
      return this.toggleAlerts$.pipe(
        timeout({
          each: state.timeOut,
          with: () => {
            console.log('hide');
            this.hideAlert();
            return EMPTY;
          },
        })
      );
    } else {
      return this.toggleAlerts$;
    }
  };
  readonly showAlert = this.effect(
    (
      content$: Observable<{
        type: AlertsType;
        header: string;
        message: string | Observable<string>;
        isShow: boolean | Observable<boolean>;
        timeOut: number;
      }>
    ) => {
      return content$.pipe(
        switchMap(({ message, header, timeOut, type, isShow }) => {
          if (isObservable(message) && isObservable(isShow)) {
            return message.pipe(
              mergeMap((m) =>
                isShow.pipe(
                  map((s) => {
                    return this.updateAlert({
                      type,
                      message: m,
                      isShow: s,
                      header,
                      timeOut,
                    });
                  })
                )
              )
            );
          } else if (isObservable(message) && typeof isShow == 'boolean') {
            return message.pipe(
              tap((m) => {
                return this.updateAlert({
                  type,
                  message: m,
                  isShow,
                  header,
                  timeOut,
                });
              })
            );
          } else if (isObservable(isShow) && typeof message == 'string') {
            return isShow.pipe(
              tap((s) => {
                console.log(s, type, header, message, timeOut);
                return this.updateAlert({
                  isShow: s,
                  message,
                  header,
                  type,
                  timeOut,
                });
              })
            );
          } else if (typeof message == 'string' && typeof isShow == 'boolean') {
            return this.updateAlert({ type, message, header, timeOut, isShow });
          } else {
            return this.updateAlert({
              type,
              header,
              timeOut,
              message: '',
              isShow: false,
            });
          }
        })
      );
    }
  );
}
