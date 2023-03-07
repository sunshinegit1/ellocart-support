import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(
    platform: Platform,
    private router: Router
    ) {
    platform.ready().then(() => {      
      this.OneSignalInit();
    })
  }

  OneSignalInit(){
     // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("f385dd03-8ec1-40ad-a8c8-5eb39f913560");
  OneSignal.setNotificationOpenedHandler( (jsonData) => {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      jsonData = JSON.parse(JSON.stringify(jsonData));
      let data:any = jsonData.notification.additionalData;
      if(data.action==='new_order'){
        this.router.navigateByUrl('/orders/received')
      } 
    });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log("User accepted notifications: " + accepted);
    });
  }
}
