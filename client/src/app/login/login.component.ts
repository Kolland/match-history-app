import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginApiService } from './services/login-api.service';
import { AuthStoreService } from './services/auth-store.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private loginApiService: LoginApiService,
    private authStoreService: AuthStoreService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if(this.loginForm.valid) {
      this.loginApiService.login(this.loginForm.value)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error.message || e.error.error);
          return of(null)
        })
      )
      .subscribe(res => {
        if(!res) {
          return
        }
        this.authStoreService.setAuthToken(res.accessToken);
        this.router.navigate(['events-view'])
      })
    }
  }

  getErrorMessage(control: AbstractControl) {
    if(control.hasError('required')) {
      return 'This field is required'
    }

    if(control.hasError('email')) {
      return 'Email format is invalid'
    }
  }

}
