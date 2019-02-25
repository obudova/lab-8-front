import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  user: any;

  @Input()
  parent: FormGroup;

  @Input()
  roles: any[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const userForm = {
      name: this.fb.control(this.user && this.user.name, Validators.required),
      username: this.fb.control(this.user && this.user.username, Validators.required),
      password: this.fb.control(this.user && this.user.password, Validators.required),
      role_id: this.fb.control(this.user && this.user.role_id, Validators.required)
    };

    Object.keys(userForm).forEach((control) => {
      this.parent.addControl(control, userForm[control])
    });
  }
}
