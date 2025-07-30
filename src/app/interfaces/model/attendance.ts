export interface Attendance {
  id: number;
  date: string;
  check_in_time: string;
  check_out_time: string | null;
}
