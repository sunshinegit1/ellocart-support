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
  products:any=[];

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
      this.orderData = res.ResultSet;
      this.products = res.ProductsData;
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
