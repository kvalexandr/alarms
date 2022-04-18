import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AlarmStateInterface} from "../types/alarmState.interface";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getList(search: string = ''): Observable<AlarmStateInterface[]> {
    let params = new HttpParams();
    params = params.append('time_end_ne', 0);
    params = params.append('_sort', 'time_start');
    params = params.append('_order', 'desc');
    if (search) {
      params = params.append('type_like', search);
    }

    return this.http.get<AlarmStateInterface[]>(`${environment.apiUrl}/alarms`, {
      params
    });
  }
}
