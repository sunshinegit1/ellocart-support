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
  clat = 17.018882; clng = 81.8115043;
  @ViewChild(IonModal) modal!: IonModal;
  marker:any;
  
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
  openMap(data:any){
 setTimeout(() => {
     this.onload(data);
 }, 1000);
  }
  close() {
    console.log('close');
    this.modal.dismiss();
  }
  async onload(data:any){
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.maps = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [data.user[1],data.user[0]], // starting position17.0266923,81.8017798
    zoom: 9 // starting zoom
    });
    
    this.createMarker(data.user[1],data.user[0]);
    this.createMarker(data.seller[1],data.seller[0]);

    var latlngs = [
      data.user.reverse(),data.seller.reverse()
    ];
    const newCoords = latlngs.join(';');
    // Set the radius for each coordinate pair to 25 meters
    const radius = latlngs.map(() => 25);
    const radiuses = radius.join(';');
    const profile = 'driving';
    // Create the query
    const query = await fetch(
    `https://api.mapbox.com/matching/v5/mapbox/${profile}/${newCoords}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=pk.eyJ1IjoidHNtc3Bnb24iLCJhIjoiY2pxZjgxNnF6NGF3YTQybjJlZHZmcG0ybyJ9.CYQ0-i7Vvmtr0zCvxxSEDQ`,
    { method: 'GET' }
    );
    const response = await query.json();
    // Handle errors
    if (response.code !== 'Ok') {
    alert(
    `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
    );
    return;
    }
    const coords = response.matchings[0].geometry;
    this.maps.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': coords
        }
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': 'black',
        'line-width': 3,
        'line-opacity': 1
      }
      });
    this.maps.fitBounds(latlngs);

  }

  createMarker(long:any,lat:any){
    const el = document.createElement('div');
    el.className = 'custom_marker';
      let colour = '#2ebb74';
      let title = 'My location';
    var popup = new mapboxgl.Popup().setText(title);
    this.marker = new mapboxgl.Marker({
      color:colour
    })
      .setLngLat([long,lat])
      .setPopup(popup)
      .addTo(this.maps);
  }
}
