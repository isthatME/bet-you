import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required]
    });
  }
  onSubmit(): void {
    this.router.navigate(['/home'])
  }
}
