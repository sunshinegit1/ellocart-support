import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(
    platform: Platform,
    private router:Router,
    private _location:Location
    ) {
        document.body.setAttribute('color-theme','light');
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setBackgroundColor({color:'#752dac'});
        platform.ready().then(() => {      
          this.OneSignalInit();
        })
        App.addListener('backButton', () =>{
          if (this._location.isCurrentPathEqualTo('/login') || (this._location.isCurrentPathEqualTo('/dashboard') && localStorage.getItem('user') !== ''))
          {
            App.exitApp();
          } 
          else
          {
            this._location.back();
          }
        });
      }

  OneSignalInit(): void{
     // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("8ea989e2-f574-4776-bde1-3702fe54e553");
  // OneSignal.setAppId("f385dd03-8ec1-40ad-a8c8-5eb39f913560");
  // OneSignal.setAppId("e0098667-a62b-47ca-867b-4a498992eec8");
  OneSignal.setNotificationOpenedHandler((jsonData)=>{
      // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      jsonData = JSON.parse(JSON.stringify(jsonData));
      let data:any = jsonData.notification.additionalData;
      if(data.action==='new_order'){
        this.router.navigateByUrl('/orders/received')
      } 
  });

  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
    console.log("User accepted notifications: " + accepted);
  });


  // OneSignal.setNotificationOpenedHandler( (jsonData) => {
  //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  //   jsonData = JSON.parse(JSON.stringify(jsonData));
  //   let data:any = jsonData.notification.additionalData;
  //   if(data.action==='new_order'){
  //     this.router.navigateByUrl('/orders/received')
  //   } 
  // });
  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
  }
}
