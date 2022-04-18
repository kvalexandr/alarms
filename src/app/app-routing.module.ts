import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlarmsComponent} from "./components/alarms/alarms.component";
import {HistoryComponent} from "./components/history/history.component";

const routes: Routes = [
  {path: '', redirectTo: 'alarms', pathMatch: 'full'},
  {path: 'alarms', component: AlarmsComponent},
  {path: 'history', component: HistoryComponent},
  {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
