import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
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
  constructor(
   private api:ApiService,
   private router:Router,
   private platform: Platform,
   private route: ActivatedRoute
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.status === 'dashboard') {
        App.exitApp();
      }
    });
   }

  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.getData();
    if(this.userData == null){
      this.router.navigateByUrl('/login');
    }
    this.status = this.route.snapshot.paramMap.get('status');
  }

  getData(){
    this.api.postCall('get_today_stats.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.data = res.ResultSet;
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

}
