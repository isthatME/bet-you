import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { LoginResponse } from 'src/app/services/users/models/login-response.interface';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  onSubmit(): void {
    this.userService
      .login(this.form.value)
      .subscribe({
        next: this.handleLoginResponse.bind(this),
        error: this.handleError.bind(this)
      })
  }
  handleLoginResponse(res: LoginResponse): void {
    if (res.succed) {
      this.router.navigate(['home'])
    } else { this.notifierService.showNotification(res.message, 'Fechar', 'error') }
  }
  handleError(): void {
    this.notifierService.showNotification('Não foi possivel realizar o login, tente novamente mais tarde!', 'Fechar', 'error')
  }
}
