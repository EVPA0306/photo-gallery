import { Injectable } from '@angular/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Platform } from '@ionic/angular';
import { Photo } from './photo.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private platform: Platform;

  constructor(private emailComposer: EmailComposer, platform: Platform) {
    this.platform = platform;
  }

  public async emailPicture(photo: Photo) {
    
    const fileName = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    
    if(!this.platform.is('hybrid')) {      
      // Read each saved photo's data from the Filesystem
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: FilesystemDirectory.Data
      });
      // Web platform only: Load the photo as base64 data
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }

    let email = {
      to: 'first.last@gmail.com',
      cc: 'first.last@gmail.com',
      bcc: ['first.last@gmail.com'],
      attachments: [
        photo.webviewPath
      ],
      subject: 'Picture',
      body: 'Sending picture',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
