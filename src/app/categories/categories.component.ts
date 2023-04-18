import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  userData: any;
  categories: any;

  constructor(
    private api:ApiService
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.getCategories();
  }
  getCategories(){
    this.api.postCall('get_rest_cat.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.categories = res.ResultSet;
      console.log(res);
    })
   }
   select(e:any,cid:any,rid:any){
    this.api.postCall('aaa.php',{
      uid: this.userData.uid,
          rid: rid,
          cid:cid,
          status:Number(e.detail.checked).toString()
    }).subscribe((res:any)=>{
      console.log(res);
    })
   }
   submit(){

   }

}
