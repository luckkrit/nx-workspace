import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { RedirectStore } from '../../store/redirect-store';

@Component({
  selector: 'nx-workspace-redirect',
  template: ` <ng-container></ng-container> `,
  styles: [],
})
export class RedirectComponent implements OnInit {
  @Input()
  isRedirect: boolean | null = false;
  @Input()
  redirectTo = '';
  @Input()
  timeOut = 0;
  constructor(private redirectStore: RedirectStore) {}

  ngOnInit(): void {
    this.redirectStore.redirectTo({
      isRedirect: this.isRedirect,
      redirectTo: this.redirectTo,
      timeOut: this.timeOut,
    });
  }
}
