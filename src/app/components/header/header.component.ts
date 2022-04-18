import {Component, OnInit} from '@angular/core';
import {AlarmsService} from "../../services/alarms.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  alarmCount = 0;

  constructor(
    private alarmsService: AlarmsService,
  ) {
  }

  ngOnInit() {
    this.alarmsService.getCountAlarms();
    this.alarmsService.alarms.subscribe(data => {
      this.alarmCount = data;
    })
  }

  generateAlarm() {
    this.alarmsService.generateAlarm().subscribe(data => {
      this.alarmsService.getCountAlarms();
      console.log('Аларм сгенерирован')
    });
  }
}
