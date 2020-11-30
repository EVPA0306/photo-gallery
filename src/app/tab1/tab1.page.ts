import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public emailService: EmailService) {}

  public checkEmailClient() {
    this.emailService.checkEmailClient();
  }

}
