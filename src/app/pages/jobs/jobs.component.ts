import { Component, inject } from '@angular/core';
import { JobService } from '../../services/api/job.service';
import { JobComponent } from '../../components/jobs/job/job.component';
import { FormAddComponent } from '../../components/jobs/form-add/form-add.component';
import { Job as JobModel } from '../../types/models/job';
import { Job as JobRequest } from '../../types/request/job';

@Component({
  selector: 'app-jobs',
  imports: [JobComponent, FormAddComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  private jobService = inject(JobService);
  public jobResult: JobModel[] = [];
  public selectedJob?: JobModel;
  public showForm = false;

  ngOnInit() {
    this.getAllJobs();
  }

  editJob(job: JobModel) {
    this.selectedJob = job;
    console.log(this.selectedJob);
    this.showForm = true;
  }

  createJob() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedJob = undefined;
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((response) => {
      console.log(response);
      this.jobResult = response.data;
    });
  }

  createNewJob(job: JobRequest) {
    this.jobService.createJob(job).subscribe({
      next: (response) => {
        console.log(response);
        this.getAllJobs();
        this.showForm = false;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  updateJob(job: JobRequest) {
    if (!this.selectedJob) return;

    this.jobService.updateJob(this.selectedJob.id, job).subscribe({
      next: (response) => {
        console.log(response);
        this.getAllJobs();
        this.showForm = false;
        this.selectedJob = undefined;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  deleteJob(job: JobModel) {
    this.jobService.deleteJob(job.id).subscribe({
      next: (response) => {
        console.log(response);
        this.getAllJobs();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
