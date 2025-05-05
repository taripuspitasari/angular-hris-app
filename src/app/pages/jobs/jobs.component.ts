import { Component, inject, signal } from '@angular/core';
import { JobService } from '../../services/api/job.service';
import { JobComponent } from '../../components/jobs/job/job.component';
import { FormAddComponent } from '../../components/jobs/form-add/form-add.component';
import { JobDetailComponent } from '../../components/jobs/job-detail/job-detail.component';
import { Job as JobModel } from '../../types/models/job';
import { Job as JobRequest } from '../../types/request/job';
import { AuthService } from '../../services/security/auth.service';
import { NotificationService } from '../../services/utils/notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../types/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [
    JobComponent,
    FormAddComponent,
    ReactiveFormsModule,
    JobDetailComponent,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
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

  editJob(job: JobModel) {
    this.selectedJob = job;
    this.showForm = true;
  }

  createJob() {
    this.showForm = true;
  }

  detailJob(job: JobModel) {
    this.showJobDetail = true;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { jobId: job.id },
      queryParamsHandling: 'merge',
    });
  }

  closeForm() {
    this.showForm = false;
    this.showJobDetail = false;
    this.selectedJob = undefined;
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

  createNewJob(job: JobRequest) {
    this.jobService.createJob(job).subscribe({
      next: (response) => {
        this.fetchJobs();
        this.showForm = false;
        this.notif.show(response.message, 'success');
      },
      error: (err) => {
        this.notif.show(err.error.errors, 'error');
      },
    });
  }

  updateJob(job: JobRequest) {
    if (!this.selectedJob) return;

    this.jobService.updateJob(this.selectedJob.id, job).subscribe({
      next: (response) => {
        this.fetchJobs();
        this.showForm = false;
        this.selectedJob = undefined;
        this.notif.show(response.message, 'success');
      },
      error: (err) => {
        this.notif.show(err.error.errors, 'error');
      },
    });
  }

  deleteJob(job: JobModel) {
    this.jobService.deleteJob(job.id).subscribe({
      next: (response) => {
        this.fetchJobs();
        this.notif.show(response.message, 'success');
      },
      error: (err) => {
        this.notif.show(err.error.errors, 'error');
      },
    });
  }
}
