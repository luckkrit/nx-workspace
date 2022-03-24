import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  concatMap,
  delay,
  EMPTY,
  isObservable,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
  timeout,
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
  readonly showAlertSuccess = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_SUCCESS,
      header,
      message,
      isShow: true,
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
  readonly showAlertInfo = (message: string, header: string) =>
    this.patchState({
      type: AlertsType.ALERT_INFO,
      header,
      message,
      isShow: true,
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

  readonly closeAfter = (timeOut: number): Observable<ToggleAlertsState> =>
    this.toggleAlerts$.pipe(
      timeout({
        each: timeOut,
        with: () => {
          this.hideAlert();
          return EMPTY;
        },
      })
    );

  readonly showAlertInfoEffect = this.effect(
    (
      content$: Observable<{ message: string; header: string; timeOut: number }>
    ) =>
      content$.pipe(
        concatMap(({ message, header, timeOut }) => {
          this.showAlertInfo(message, header);
          return this.closeAfter(timeOut);
        })
      )
  );
  readonly showAlertSuccessEffect = this.effect(
    (
      content$: Observable<{ message: string; header: string; timeOut: number }>
    ) =>
      content$.pipe(
        concatMap(({ message, header, timeOut }) => {
          this.showAlertSuccess(message, header);
          return this.closeAfter(timeOut);
        })
      )
  );
  readonly showAlertDangerEffect = this.effect(
    (
      content$: Observable<{ message: string; header: string; timeOut: number }>
    ) =>
      content$.pipe(
        concatMap(({ message, header, timeOut }) => {
          this.showAlertDanger(message, header);
          return this.closeAfter(timeOut);
        })
      )
  );

  readonly initAlert = this.effect(
    (
      content$: Observable<{
        status$: Observable<{
          isLoading: boolean;
          isSuccess: boolean;
          error: string;
        }>;
        header: { loading: string; success: string; error: string };
        message: { loading: string; success: string };
        timeOut: number;
      }>
    ) => {
      return content$.pipe(
        concatMap(({ status$, header, message, timeOut }) => {
          console.log('before');
          return status$.pipe(
            concatMap(({ isLoading, isSuccess, error }) => {
              console.log(isLoading, isSuccess, error);
              if (isLoading) {
                this.showAlertInfo(message.loading, header.loading);
              } else if (isSuccess) {
                this.showAlertSuccess(message.success, header.success);
              } else {
                if (error.length > 0) {
                  this.showAlertDanger(error, header.error);
                }
              }
              if (error.length == 0) {
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
                return this.toggleAlerts$;
              }
            })
          );
        })
      );
    }
  );
}
