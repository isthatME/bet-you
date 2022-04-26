import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier/notifier.service';
import { RegisterResponse } from 'src/app/core/services/users/models/register-response';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(5)]],
      repeatPassword: [null, [Validators.required, Validators.minLength(5)]]
    });
  }
  onSubmit(): void {
    this.userService
      .register(this.form.value)
      .subscribe({
        next: this.handleRegisterResponse.bind(this),
        error: this.handleError.bind(this)
      })
  }
  handleRegisterResponse(res: RegisterResponse): void {
    if (res.succed) {
      this.notifierService.showNotification(res.message, 'Fechar', 'success')
      this.router.navigate(['/home', { relativeTo: this.router }])
    } else {
      this.notifierService.showNotification(res.message, 'Fechar', 'error')
    }
  }
  handleError(): void {
    this.notifierService.showNotification('Não foi possível fazer seu cadastro, tente novamente mais tarde!', 'Fechar', 'error')
  }
}
