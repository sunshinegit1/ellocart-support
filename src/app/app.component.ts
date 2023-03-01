import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(platform: Platform) {
    platform.ready().then(() => {      
      this.OneSignalInit();
    })
  }

  OneSignalInit(): void{
     // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("e0098667-a62b-47ca-867b-4a498992eec8");
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
  }
}
