import { Component, inject, signal } from '@angular/core';
import { JobService } from '../../services/api/job.service';
import { JobComponent } from '../../components/jobs/job/job.component';
import { JobDetailComponent } from '../../components/jobs/job-detail/job-detail.component';
import { Job as JobModel } from '../../types/models/job';
import { AuthService } from '../../services/security/auth.service';
import { NotificationService } from '../../services/utils/notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../types/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [JobComponent, ReactiveFormsModule, JobDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private fb = inject(FormBuilder);
  private jobService = inject(JobService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  protected notif = inject(NotificationService);
  protected pageNumber = 1;
  protected totalPages = 1;
  public jobResult: JobModel[] = [];
  public selectedJob?: JobModel;
  public selectedShow?: JobModel;
  public showForm = false;
  public showJobDetail = false;

  searchForm: FormGroup;

  user = signal<User | null>(null);

  constructor() {
    this.searchForm = this.fb.group({
      title: [''],
      job_type: [''],
      workplace_type: [''],
      experience_level: [''],
    });
  }

  ngOnInit() {
    this.user.set(this.authService.getUser());
    this.activatedRoute.queryParams.subscribe((params) => {
      const jobId = params['jobId'];
      if (jobId) {
        this.showJobDetail = true;
        this.fetchJobById(jobId);
      }
    });
    this.fetchJobs();
  }

  onSearch() {
    const cleanedParams = Object.fromEntries(
      Object.entries(this.searchForm.value).filter(([_, value]) => value !== '')
    );

    this.fetchJobs(cleanedParams);
  }

  fetchJobById(id: number) {
    this.jobService.getJobById(id).subscribe((response) => {
      this.selectedShow = response.data;
    });
  }

  fetchJobs(params?: any) {
    this.jobService.getAllJobs(params).subscribe((response) => {
      this.jobResult = response.data;
      this.totalPages = response.paging.total_page;
      this.pageNumber = response.paging.current_page;
    });
  }

  onPrev() {
    if (this.pageNumber == 1) return;
    this.pageNumber--;
    this.fetchJobs({ page: this.pageNumber });
  }

  onNext() {
    if (this.pageNumber >= this.totalPages) return;
    this.pageNumber++;
    this.fetchJobs({ page: this.pageNumber });
  }

  detailJob(job: JobModel) {
    this.showJobDetail = true;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { jobId: job.id },
      queryParamsHandling: 'merge',
    });
  }

  closeDetail() {
    this.showJobDetail = false;
    this.selectedShow = undefined;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { jobId: null },
      queryParamsHandling: 'merge',
    });
  }
}
