import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  userData: any;
  loading:any;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private api: ApiService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    if (this.userData) {
      this.showLoading();
      this.router.navigateByUrl('/dashboard');
    }
    this.loginFormvalidators();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Logging In...',
      duration: 3000
    });
    this.loading.present();
  }

  login() {
    if (this.loginForm.valid) {
      const obj = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.api.postCall('login.php', obj).subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res.user))
        this.loginFormvalidators();
        this.router.navigateByUrl('/dashboard')
      })
    } else {
      console.log('invalid details');
      console.log(this.loginForm.value);
    }
  }
  loginFormvalidators() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/[0-9]/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[0-9]/)]],
    })
  }
}
