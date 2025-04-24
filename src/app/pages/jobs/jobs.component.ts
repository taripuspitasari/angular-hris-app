import { Component, inject } from '@angular/core';
import { JobService } from '../../services/api/job.service';
import { JobComponent } from '../../components/jobs/job/job.component';
import { FormAddComponent } from '../../components/jobs/form-add/form-add.component';

@Component({
  selector: 'app-jobs',
  imports: [JobComponent, FormAddComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  private jobService = inject(JobService);
  public jobResult: any = [];
  public selectedJob?: any;
  public showForm = false;

  ngOnInit() {
    this.getAllJobs();
  }

  editJob(job: any) {
    this.selectedJob = job;
    console.log(this.selectedJob);
    this.showForm = true;
  }

  createJob() {
    this.showForm = true;
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((response) => {
      console.log(response);
      this.jobResult = response.data;
    });
  }

  createNewJob(job: any) {
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

  updateJob(job: any) {
    this.jobService.updateJob(this.selectedJob.id, job).subscribe({
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

  deleteJob(job: any) {
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
