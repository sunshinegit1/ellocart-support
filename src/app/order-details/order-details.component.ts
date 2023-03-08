import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  userData: any;
  oid: any;
  orderData:any=[];

  constructor(
    private api:ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.oid = this.route.snapshot.paramMap.get('oid');
    this.getOrderDetails(this.oid);
  }
  getOrderDetails(id:any){
    this.api.postCall('get_order_details.php',{uid:this.userData.uid, oid:id}).subscribe((res:any)=>{
      console.log(res);
      this.orderData = res.ResultSet;
    })
  }
}
