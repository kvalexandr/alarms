import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlarmStateInterface} from "../../types/alarmState.interface";
import {HistoryService} from "../../services/history.service";
import {Event} from "@angular/router";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public alarmsList: AlarmStateInterface[] = [];
  private subscriptions: Subscription[] = [];

  @ViewChild('search', {static: true}) search!: ElementRef;

  constructor(
    private historyService: HistoryService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.historyService.getList().subscribe(alarms => {
        this.alarmsList = alarms;
      })
    );

    this.subscriptions.push(
      fromEvent<any>(this.search.nativeElement, 'keyup')
        .pipe(
          debounceTime(300),
          map(event => event.target.value),
          filter(text => text.length > 1),
          distinctUntilChanged(),
          switchMap(text => this.historyService.getList(text))
        )
        .subscribe(alarms => {
          this.alarmsList = alarms;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
