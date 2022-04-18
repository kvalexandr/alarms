export interface AlarmStateInterface {
  id: number
  type: string
  device: string
  time_start: number,
  time_confirm: number,
  time_end: number,
  place: string,
  parameter: string,
  value: string,
  reason: string
}
