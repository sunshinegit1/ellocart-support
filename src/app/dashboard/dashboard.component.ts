import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonModal, Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data:any={};
  userData: any;
  status: any;
  @ViewChild(IonModal) modal!:IonModal;

  constructor(
   private api:ApiService,
   private router:Router,
   private platform: Platform,
   private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.getData();
    if(this.userData == null){
      this.router.navigateByUrl('/login');
    }
    this.status = this.route.snapshot.routeConfig?.path;
  }

  getData(){
    this.api.postCall('get_today_stats.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.data = res.ResultSet;
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    // window.location.reload();
  }
 selectDate(e:any){
  console.log(e.detail.value);
  console.log(new Date(e.detail.value).toLocaleDateString());
  this.modal.dismiss();
 }

}
