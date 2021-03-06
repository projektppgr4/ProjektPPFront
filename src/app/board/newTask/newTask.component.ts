import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Task} from '../../_models/index';
import { StoryService } from '../../_services/index';
import {ActivatedRoute, Params} from '@angular/router';
import {TaskService} from '../../_services/task.service';
import {NgForm} from '@angular/forms';
import {AlertService} from "../../_services/alert.service";



@Component({
  moduleId: module.id,
  templateUrl: 'newTask.component.html',
  selector : 'taskForm'
})

export class NewTaskComponent implements OnInit {
  // iterationId: number;
  @Input() storyId: number;
  @Output() onSubmit = new EventEmitter<boolean>()

  createTask: boolean;
  editTask: boolean;
  model: Task = new Task();

  constructor(private taskService: TaskService, private alertService: AlertService) {

  }

  ngOnInit() {

  }


  submitTask(f: NgForm) {
    this.model = f.value;
    console.log(this.model);
    this.taskService.createTask(this.model, this.storyId)
      .subscribe(() => {
      this.createTask = false;
      this.onSubmit.emit(true);
      this.alertService.success('Task Created', true);
      });
  }

}
/**
 * Created by Akai on 2017-06-20.
 */
