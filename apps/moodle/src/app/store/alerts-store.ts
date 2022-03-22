import { Injectable } from "@angular/core"
import { ComponentStore } from "@ngrx/component-store"
import { EMPTY, map, mergeMap, Observable, tap } from "rxjs"

export enum AlertsType {
    ALERT_PRIMARY = "alert-primary",
    ALERT_SECONDARY = "alert-secondary",
    ALERT_SUCCESS = "alert-success",
    ALERT_DANGER = "alert-danger",
    ALERT_WARNING = "alert-warning",
    ALERT_INFO = "alert-info",
    ALERT_LIGHT = "alert-light",
    ALERT_DARK = "alert-dark"
}
export interface AlertsState {
    type: AlertsType
    header: string,
    message: string,
    isShow: boolean
}

export interface AlertsContent {
    header: string,
    message$: Observable<string>
}

@Injectable()
export class AlertsStore extends ComponentStore<AlertsState> {
    readonly type$ = this.select((state) => state.type)
    readonly header$ = this.select((state) => state.header)
    readonly message$ = this.select((state) => state.message)
    readonly isShow$ = this.select((state) => state.isShow)
    constructor() {
        super({ type: AlertsType.ALERT_LIGHT, header: "", message: "", isShow: false })
    }
    readonly showAlertPrimary = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_PRIMARY, header, message, isShow: true })
    readonly showAlertSecondary = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_SECONDARY, header, message, isShow: true })
    readonly showAlertSuccess = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_SUCCESS, header, message, isShow: true })
    readonly showAlertDanger = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_DANGER, header, message, isShow: true })
    readonly showAlertWarning = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_WARNING, header, message, isShow: true })
    readonly showAlertInfo = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_INFO, header, message, isShow: true })
    readonly showAlertLight = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_LIGHT, header, message, isShow: true })
    readonly showAlertDark = (message: string, header: string) => this.patchState({ type: AlertsType.ALERT_DARK, header, message, isShow: true })
    readonly hideAlert = () => this.patchState({ isShow: false })

}