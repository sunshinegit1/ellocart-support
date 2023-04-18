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
  searchResults:any;
  restaurants: any;
  search1: any;
  searchVal: string ='';

  constructor(
    private api:ApiService
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.getRestaurants();
    this.getCategories();
  }
  getCategories(){
    this.api.postCall('get_rest_cat.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.categories = res.ResultSet;
      this.searchResults = [...res.ResultSet];
    })
   }
   getRestaurants(){
    this.api.postCall('get_restaurants.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.restaurants = res.ResultSet;
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
   search(e:any){
    if(this.search1){
      this.searchResults=this.search1.filter((ele:any)=>{
      let title = ele.title.toLowerCase();
      return title.match(e.detail.value.toLowerCase())
    })}
    else{
      this.searchResults=this.categories.filter((ele:any)=>{
        let title = ele.title.toLowerCase();
        return title.match(e.detail.value.toLowerCase())
      })
    }
   }
   selectRest(e:any){
    this.searchVal='';
    if(e.detail.value === 'all'){
      this.searchResults = this.categories
      this.search1=[];
    } else {
      this.searchResults = this.categories.filter((ele:any)=>{
        return ele.rid == e.detail.value
      })
    }
    this.search1= this.searchResults;
   }

}
