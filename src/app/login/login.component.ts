import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  constructor( private fb:UntypedFormBuilder, private router:Router, private api:ApiService,
    ) {}

  ngOnInit() {
    this.loginFormvalidators();
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      // const obj = {
      //   email: this.loginForm.value.email,
      //   password: this.loginForm.value.password
      // }
      // this.api.postCall('/login',obj).subscribe(res => {
        //   console.log(res);
        //   localStorage.setItem('token',res.token)
        //   this.loginFormvalidators();
        // })
        this.router.navigateByUrl('/dashboard')
    }
  }
  loginFormvalidators(){
    this.loginForm = this.fb.group({
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    })
  }
}
