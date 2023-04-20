import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  loading:any;

  constructor(
    private api:ApiService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    
  }
  ngAfterViewInit() {
    this.getRestaurants();
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading Restaurents',
    });
    this.loading.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg?:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: position
    });

    await toast.present();
  }
  getRestaurants(){
    this.api.postCall('get_restaurants.php',{uid:this.userData.uid}).subscribe((res:any)=>{
      this.restaurants = res.ResultSet;
      this.searchResults = [...res.ResultSet]
    //   this.checkAll = false;
    //   this.checkAll = this.restaurants.every((elem:any)=> elem.rstatus === '1');
    // console.log(this.checkAll);

      if(this.restaurants.length>0){
        this.checkAll = this.restaurants.every((elem:any)=> elem.rstatus === '1');
        console.log(this.checkAll) 
      }
    })
   }

   selectAll(e:any){
    this.checkAll= !this.checkAll;
    this.api.postCall('update_restaurant_status.php',{
      uid: this.userData.uid,
      rid: 'all',
      rstatus:Number(e.detail.checked).toString()
    }).subscribe((res:any)=>{
      this.getRestaurants();
      // if(this.checkAll)
      //   this.restaurants.forEach((elem:any)=> elem.rstatus ='1')
      // else
      //   this.restaurants.forEach((elem:any)=> elem.rstatus ='0');
    })
   }
   select(e:any,id:any){
      this.api.postCall('update_restaurant_status.php',{
          uid: this.userData.uid,
          rid: id,
          rstatus:Number(e.detail.checked).toString()
      }).subscribe((res:any)=>{
        // console.log(e)
        // console.log(e.detail.checked)
        // if(e.detail.checked===false){
        //   this.checkAll=false;
        // }
      })
}

  search(e:any){
    this.searchResults=this.restaurants.filter((ele:any)=>{
      let title = ele.title.toLowerCase();
      return title.match(e.detail.value.toLowerCase())
    })
   }

}
