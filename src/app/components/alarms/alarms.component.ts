import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AlarmsService} from "../../services/alarms.service";
import {AlarmStateInterface} from "../../types/alarmState.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit, OnDestroy {
  public alarmsList!: AlarmStateInterface[];
  private subscribe = new Subscription();

  constructor(
    private alarmsService: AlarmsService
  ) {
  }

  ngOnInit() {
    this.subscribe = this.alarmsService.alarms.subscribe(data => {
      this.fetchAlarms();
    })
  }

  fetchAlarms() {
    this.alarmsService.getList().subscribe(alarms => {
      this.alarmsList = alarms;
    })
  }

  confirm(alarm: AlarmStateInterface) {
    this.alarmsService.confirm(alarm).subscribe(data => {
      this.alarmsService.getCountAlarms();
    });
  }

  repair(alarm: AlarmStateInterface) {
    this.alarmsService.repair(alarm).subscribe(data => {
      this.alarmsService.getCountAlarms();
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
