import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
   private http:HttpClient
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.getData();
  }

  getData(){
    this.api.postCall('get_today_stats.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.data = res.ResultSet;
    })
  }

}
