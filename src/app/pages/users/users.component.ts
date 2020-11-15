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

  buildForm() {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  save() {
    alert('enviado');
  }

}
