import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AlarmStateInterface} from "../types/alarmState.interface";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {
  private alarmsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public alarms = this.alarmsSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getList(): Observable<AlarmStateInterface[]> {
    let params = new HttpParams();
    params = params.append('time_end', 0);

    return this.http.get<AlarmStateInterface[]>(`${environment.apiUrl}/alarms`, {
      params
    });
  }

  confirm(alarm: AlarmStateInterface) {
    const confirmAlarm = {
      ...alarm,
      "time_confirm": Date.now(),
    };

    return this.update(confirmAlarm);
  }

  repair(alarm: AlarmStateInterface) {
    const repairAlarm = {
      ...alarm,
      "time_end": Date.now(),
    };

    return this.update(repairAlarm);
  }

  update(alarm: AlarmStateInterface): Observable<AlarmStateInterface> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(alarm);

    return this.http.patch<AlarmStateInterface>(`${environment.apiUrl}/alarms/${alarm.id}`, body, {
      headers
    })
  }

  generateAlarm(): Observable<AlarmStateInterface> {
    const random = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const alarm: AlarmStateInterface = {
      "id": Date.now(),
      "type": `БМС-${random(1, 5)}`,
      "device": `${random(1000, 3000)}`,
      "time_start": Date.now(),
      "time_confirm": 0,
      "time_end": 0,
      "place": "Скважина",
      "parameter": "Ia",
      "value": "5.9",
      "reason": "Ток холостого хода СУ ШГН"
    };

    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(alarm);

    return this.http.post<AlarmStateInterface>(`${environment.apiUrl}/alarms`, body, {
      headers
    });
  }

  getCountAlarms() {
    this.getList().subscribe(alarms => {
      this.alarmsSubject.next(alarms.length);
    });
  }
}
