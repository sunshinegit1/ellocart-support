import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild(IonModal) modal!:IonModal;
  userData: any;
  oid: any;
  orderData:any=[];
  remove=false;
  products=[
    {
      id:1,
      name:'p1',
      price: 245,
      quantity: 2,
      selected:true
    },
    {
      id:2,
      name:'p2',
      price: 230,
      quantity: 1,
      selected:true
    },
    {
      id:3,
      name:'p3',
      price: 150,
      quantity: 4,
      selected:true
    },
    {
      id:4,
      name:'p4',
      price: 120,
      quantity: 2,
      selected:false
    },
    {
      id:5,
      name:'p5',
      price: 350,
      quantity: 1,
      selected:false
    },
    {
      id:6,
      name:'p6',
      price: 400,
      quantity: 4,
      selected:false
    }
  ];

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
  editProducts(){
    this.remove = true;
  }
  removeProduct(i: any){
    this.products.splice(i,1);
  }

  //modal
  cancel() {
    this.modal.dismiss();
  }

  confirm() {
    this.modal.dismiss();
  }
  searchProduct(e:any){
    console.log(e.detail.value);
  }

}
