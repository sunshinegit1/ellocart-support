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
  @ViewChild(IonModal) modal!: IonModal;
  userData: any;
  oid: any;
  orderData: any = [];
  products: any = [];
  newProducts: any = [];
  differenceAmt: any;
  status: string | null = '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.oid = this.route.snapshot.paramMap.get('oid');
    this.status = this.route.snapshot.paramMap.get('status');
    this.getOrderDetails(this.oid);
  }
  getOrderDetails(id: any) {
    this.api.postCall('get_order_details.php', { uid: this.userData.uid, oid: id }).subscribe((res: any) => {
      this.orderData = res.ResultSet;
      this.products = res.ProductsData;
      this.differenceAmt = Number(this.orderData.o_total) - Number(this.orderData.subtotal)
    })
  }
  editProducts(id: any) {
    this.api.postCall('get_rest_details.php', { uid: this.userData.uid, rid: id }).subscribe((res: any) => {
      console.log(res);
      this.newProducts = res.RestData.Product_Data;
      // this.newProducts.forEach((elem:any)=>{
      //   elem.Menuitem_Data=elem.Menuitem_Data.filter((subelem:any)=>{
      //     this.products.forEach((pelem:any)=>{
      //       return pelem.id !== subelem.id
      //     })
      //   })
      // })
      this.products.forEach((pelem: any) => {
        this.newProducts.forEach((npelem: any) => {
          npelem.Menuitem_Data.forEach((subelem: any, i: any) => {
            if (pelem.pid === subelem.id) npelem.Menuitem_Data.splice(i, 1)
          })
        })
      })
      console.log(this.newProducts);
    })
  }
  removeProduct(i: any) {
    this.products.splice(i, 1);
  }
  addProduct(elem: any, mi: any, si: any) {
    elem.pquantity = 1;
    this.products.push(elem)
    this.newProducts[mi].Menuitem_Data.splice(si, 1);
    console.log(this.products);
  }

  //modal
  cancel() {
    this.modal.dismiss();
    this.getOrderDetails(this.oid);
  }

  confirm(rid: any, oid: any) {
    let total = this.differenceAmt;
    let newProductsPayload: any = [];
    this.products.forEach((elem: any) => {
      newProductsPayload.push({
        pid: elem.pid || elem.id,
        ptitle: elem.title,
        pquantity: elem.pquantity,
        pprice: elem.price,
        is_veg: elem.is_veg
      })
      total = total + ((Number(elem.pquantity) || 1) * Number(elem.price))
    })
    this.api.postCall('update_order_items.php', { products: newProductsPayload, uid: this.userData.uid, rid: rid, oid: oid, o_total: total, subtotal:total-this.differenceAmt }).subscribe((res: any) => {
      this.modal.dismiss();
      this.getOrderDetails(this.oid);
    })
  }
  searchProduct(e: any) {
    console.log(e.detail.value);
  }
  itemIncrease(i: any) {
    this.products[i].pquantity++;
  }
  itemDecrease(i: any) {
    if (this.products[i].pquantity > 1) this.products[i].pquantity--;
    else this.removeProduct(i);
  }

}
