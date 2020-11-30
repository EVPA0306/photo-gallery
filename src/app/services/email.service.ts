import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private emailComposer: EmailComposer) { }

  public checkEmailClient() {
    this.emailComposer.getClients()
    .then((apps: []) => {
      console.log(apps);
    })
    .catch(err => {
      console.log(err);
    });
  }
}
