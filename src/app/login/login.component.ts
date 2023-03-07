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
      const obj = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.api.postCall('login.php',obj).subscribe(res => {
          console.log(res.user);
          localStorage.setItem('user',JSON.stringify(res.user))
          this.loginFormvalidators();
          this.router.navigateByUrl('/dashboard')
        })
    } else{
      console.log('invalid details');
      console.log(this.loginForm.value);
    }
  }
  loginFormvalidators(){
    this.loginForm = this.fb.group({
      username:['',[Validators.required,Validators.minLength(10),Validators.pattern(/[0-9]/)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern(/[0-9]/)]],
    })
  }
}
