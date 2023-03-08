import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data:any={};
  userData: any;
  constructor(
   private api:ApiService,
   private router:Router
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    if(!this.userData){
      this.router.navigateByUrl('/login');
    } else this.getData();
  }

  getData(){
    this.api.postCall('get_today_stats.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.data = res.ResultSet;
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
