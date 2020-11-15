import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  resetFrom() {
    this.userForm.reset({
      fullName: '',
      userName: '',
      email: ''
    });
  }

  save(): void {
    alert(this.getEditedUser().fullName + ' ' + this.getEditedUser().userName + ' ' + this.getEditedUser().email);
    this.resetFrom();
  }

  private getEditedUser() {
    const formModel = this.userForm.value;
    return {
      fullName: formModel.fullName,
      userName: formModel.userName,
      email: formModel.email,
    };
  }

}
