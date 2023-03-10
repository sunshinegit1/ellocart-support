import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers : [CallNumber]
})
export class OrdersComponent implements OnInit {
  // dboyInfo:boolean = false;
  // assigned:boolean = false;
  // orderAccept:boolean = true;
  orders:any = [];
  searchResults:any = [];
  status: string | null = '';
  userData:any={};
  deliveryBoys: any;
  oid: any;
  rid: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
    this.status = this.route.snapshot.paramMap.get('status');
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.getData();
    this.getDelivertBoys();
  }

  getData() {
    this.api.postCall('get_'+this.status+'_orders.php',{uid:this.userData.uid}).subscribe((res: any) => {
      this.orders = res.ResultSet;
      this.searchResults = [...res.ResultSet];
    })
  }
  getDelivertBoys(){
    this.api.postCall('get_delivery_boys.php',{uid:this.userData.uid}).subscribe((res: any) => {
      this.deliveryBoys = res.ResultSet;
    })
  }
  accept(id: any){
    console.log('order accepted');
    this.api.updateCall('update_order.php',{oid: id, action:"Accept", uid:this.userData.uid}).subscribe((res:any)=>{
      this.router.navigateByUrl('/orders/pending');
    })
  }
  decline(id:any){
    console.log('order declined');
    this.api.updateCall('update_order.php',{oid: id, action:"cancel", uid:this.userData.uid}).subscribe((res:any)=>{
      this.getData();
    })
  }
  handleChange(e: any,id:any){
    console.log(e.detail.value,id);
    this.rid=e.detail.value;
    this.oid=id;
  }
  assign(){
    this.api.postCall('assign_delivery_boy.php',{oid: this.oid,rid: this.rid, uid:this.userData.uid,action:"addrider"}).subscribe((res:any)=>{
      this.rid = '';
      this.oid = '';
      this.getData();
    })
  }
  call(mobile:any){
    this.callNumber.callNumber(mobile, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  searchOrders(e:any){
    this.searchResults=this.orders.filter((elem:any)=>{
      return elem.id.endsWith(e.detail.value)
    })
  }
}
