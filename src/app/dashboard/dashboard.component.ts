import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonModal, Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data:any={};
  userData: any;
  status: any;
  selectedDate: any;
  filterStatus:boolean = false;
  @ViewChild(IonModal) modal!:IonModal;

  constructor(
   private api:ApiService,
   private router:Router,
   private platform: Platform,
   private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    localStorage.removeItem("selectedDate");
    const todayDate= new Date();    
    this.selectedDate = formatDate(todayDate,'yyyy-MM-dd',"en-US");
    if(!localStorage.getItem("selectedDate")){
      localStorage.setItem("selectedDate", this.selectedDate);
    }
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.getData();
    if(this.userData == null){
      this.router.navigateByUrl('/login');
    }
    this.status = this.route.snapshot.routeConfig?.path;
  }

  getData(){
    this.api.postCall('get_today_stats.php',{uid:this.userData.uid, selectedDate: localStorage.getItem("selectedDate")}).subscribe((res:any)=>{
      this.data = res.ResultSet;
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    // window.location.reload();
  }
 selectDate(e:any){
  this.selectedDate = formatDate(e.detail.value,'yyyy-MM-dd',"en-US");
  localStorage.setItem("selectedDate", this.selectedDate);
  this.modal.dismiss();
  this.getData();
 }
 filter(){
  this.filterStatus = !this.filterStatus;
 }


}
