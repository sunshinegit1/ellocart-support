import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { IonModal } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

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
  maps:any;
  coords:any;
  clat = 17.0000000; clng = 81.0000000;
  @ViewChild(IonModal) modal!: IonModal;
  
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
  //maps
  openMap(){
 setTimeout(() => {
     this.onload();
 }, 1000);
  }
  close() {
    console.log('close');
    this.modal.dismiss();
  }
  onload(){
    console.log('sa');
    
    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.coords = document.getElementById('coordinates');
    this.maps = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [this.clng, this.clat], // starting position17.0266923,81.8017798
    zoom: 15 // starting zoom
    });
    
    // Add zoom and rotation controls to the map.
    this.maps.addControl(new mapboxgl.NavigationControl());
    // this.createMarker(this.clng, this.clat,true);
  }
}
