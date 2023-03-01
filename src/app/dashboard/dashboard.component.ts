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
  constructor(
   private api:ApiService,
   private http:HttpClient
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getCall('get_today_stats.php').subscribe((res:any)=>{
      console.log(res.today_stats);
      this.data = res.today_stats;
      console.log(this.data);
    })
  }

}
