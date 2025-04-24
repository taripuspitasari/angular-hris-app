export interface JobRequest {
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED' | 'DRAFT';
  job_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  workplace_type: 'ONSITE' | 'REMOTE' | 'HYBRID';
  experience_level: 'FRESH_GRADUATE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';
  location: string;
  salary_range: string;
  expiry_date: string;
}
