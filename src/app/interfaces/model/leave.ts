export interface Leave {
  id: number;
  start_date: string;
  end_date: string;
  total_days: string;
  status: string;
  type: string;
}

export interface CreateLeave {
  start_date: string;
  end_date: string;
  type: string;
}
