import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, public router: Router) { }

  //LOGIN FORM
  loginForm = new FormGroup({
    emailLogin: new FormControl('',[Validators.required, Validators.email]),
    passwordLogin: new FormControl('',[Validators.required]),
  })

  get emailLogin(){
    return this.loginForm.get('emailLogin')
  }

  get passwordLogin(){
    return this.loginForm.get('passwordLogin')
  }

  // END LOGIN FORM


  //REGISTER FORM

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)]),
    confirmPassword: new FormControl('',[Validators.required]),
  },
    {
      validators: [this.match('password', 'confirmPassword')]
    })

  get username(){
    return this.registerForm.get('username')
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  // END LOGIN FORM

  ngOnInit(): void {
  }

  signIn(){
    const body:any = {
      email: this.loginForm.value.emailLogin,
      password: this.loginForm.value.passwordLogin
    }
    this.userService.signIn(body)
    .subscribe((res: any) => {
      if(res) {
        alert(res.message);
        this.userService.setAuthorizationToken(res.result.token)
        // this.loginForm.inputData.reset()
        this.router.navigate([ '', 'dashboard' ])
      }
    },
    (err) => {
        alert(err);
    })
  }

  signUp(){
    const regis:any = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.userService.signUp(regis)
    .subscribe((res: any) => {
      if(res) {
        alert("Registrasi Berhasil");

        // this.loginForm.inputData.reset()
        location.reload()
      }
    },
    (err) => {
        alert(err);
    })
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl!.errors && !checkControl!.errors.matching) {
        return null;
      }

      if (control!.value !== checkControl!.value) {
        controls.get(checkControlName)!.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
