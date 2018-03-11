import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomeworkProvider } from '../../providers/homework/homework';


/**
 * Generated class for the PhotoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-list',
  templateUrl: 'photo-list.html',
})
export class PhotoListPage {
  galleryType = 'regular';
  public photoList = [];
  currentImage = null;
  public arrayImages =[];
  
  constructor(private camera: Camera, private emailComposer: EmailComposer,    private alertCtrl: AlertController,
      public navCtrl: NavController, public navParams: NavParams , public eventProvider: EventProvider, public homeworks: HomeworkProvider) {
  }

  ionViewDidEnter(){
    console.log('photo list')
    let student_id = this.navParams.get('student_id')
    console.log(student_id)
    this.homeworks.getHomeWorks(student_id).on('value', snapshot => {
      this.photoList = [];
      snapshot.forEach( snap => {
        this.photoList.push({
          id: snap.key,
          name: snap.val().name,
          picture: snap.val().picture,
        });
        console.log(this.photoList);
        return false
      });
      console.log(this.photoList);
      
    });

  }


  onArrayImages(imageSelected) {
    let index = this.arrayImages.indexOf(imageSelected)
    if(index > -1)
    {
      this.arrayImages.splice(index, 1)
    } 
    else
    {
      this.arrayImages.push(imageSelected)
    }
  }

  deletePhoto(imageSelected) {
    let confirm = this.alertCtrl.create({
      title: "Sure you want to delete this photo? There is NO undo!",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Agree clicked");
            this.arrayImages.forEach(()=>{
              let index =this.photoList.indexOf(imageSelected)
              if(index >-1)
              {
                this.photoList.splice(index,1)
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }


  //go to the Add Photo Page
  goToAddPhoto(){
    this.navCtrl.push('AddPhotoPage');
  }

  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    }
 
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      console.log('Image error: ', err);
    });
  }
 
  sendEmail() {
    let email = {
      to: 'email.teamproject@gmail.com',
      cc: 'duaa.taani@yahoo.com',
      attachments: [
        this.currentImage
      ],
      subject: 'My Homework',
      body: 'Hey , what do you thing about this image?',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
 
}
