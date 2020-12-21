import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { EmailService } from '../services/email.service';
import { PhotoService, Photo } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService, 
    public actionSheetController: ActionSheetController,
    public emailService: EmailService) {}

  public addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: Photo, position: number) {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      },{
        text: 'Send',
        role: 'send',
        icon: 'send',
        handler: () => {
          //TODO: Implement send via Email
          this.emailService.emailPicture(photo);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
}
