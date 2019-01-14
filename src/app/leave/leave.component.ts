import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html'
})
export class LeaveComponent implements OnInit {

  validateForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      studentID        : [ null ],
      //applicationTime  : [ null ],
      startTime        : [ null ],
      endTime          : [ null ],
      leaveDay         : [ null ],
      //guideTeacher     : [ null ],
      //courseTeacher    : [ null ]
      //appleStatus      : [ null ]
    });
  }

}
