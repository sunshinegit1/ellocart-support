import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  userData: any;
  restaurants: any=[];
  checkAll:boolean = false;
  single:boolean = false;
  selectedList:any ={
    rs0:[],
    rs1:[],
  };
  searchResults: any;

  constructor(
    private api:ApiService
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.getRestaurants();
    console.log(this.checkAll);
  }
  getRestaurants(){
    this.api.postCall('get_restaurants.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.restaurants = res.ResultSet;
      this.searchResults = [...res.ResultSet]
    //   this.checkAll = false;
    //   this.checkAll = this.restaurants.every((elem:any)=> elem.rstatus === '1');
    // console.log(this.checkAll);

    })
   }
   selectAll(e:any){
    console.log(this.checkAll);
    this.checkAll= !this.checkAll;
    if(this.checkAll) this.restaurants.forEach((elem:any)=> elem.rstatus ='1')
    else {
      this.restaurants.forEach((elem:any)=> elem.rstatus ='0');
    }
    console.log(this.checkAll);
   }
   select(e:any,id:any){
  
      // this.selectedList.rs0=this.selectedList.rs0.filter((elem:any)=> elem !==id)
      // this.selectedList.rs1.push(id)
      this.api.postCall('update_restaurant_status.php',{
          uid: this.userData.uid,
          rid: id,
          rstatus:Number(e.detail.checked).toString()
      }).subscribe((res:any)=>{
        console.log(res);
      })
    // }
    // else {
    //   this.selectedList.rs1=this.selectedList.rs1.filter((elem:any)=> elem !==id)
    //   this.selectedList.rs0.push(id)
    // }
}

  search(e:any){
    this.searchResults=this.restaurants.filter((ele:any)=>{
      let title = ele.title.toLowerCase();
      return title.match(e.detail.value.toLowerCase())
    })
   }

}
