import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @Input()
  error: string = "";

  isShow = true;
  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.isShow = false;
  }

}
