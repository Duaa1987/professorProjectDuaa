import { Component } from '@angular/core';
import { normalizeURL } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import * as firebase from 'firebase/app';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoListPage } from '../photo-list/photo-list';
import { HomeworkProvider } from '../../providers/homework/homework';
@IonicPage({
  segment: 'event-detail/:eventId/:homeworkId'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  public currentEvent: any = {};
  public currenthomework: any = {};
  public homeworkName: string = '';
  public homeworkPicture: string = null;

  guestPicture1;
  loading;
  currentPhoto ;
  imgSource;
  filename: string;

  student_id;


  constructor(
    public loadingCtrl:LoadingController ,public camera:Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera,
    public homeWorks: HomeworkProvider
  ) { }

  ionViewDidLoad() {
    console.log(this.homeWorks.student_id)
    this.student_id = this.navParams.get('eventId')
    this.eventProvider
      .getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality : 100,
        targetHeight:200,
        targetWidth:200,
        destinationType : this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      })
      .then(
      imageData => {
        this.homeworkPicture = imageData;
      },
      error => {
        console.log("ERROR -> " + JSON.stringify(error));
      }
      );
  }



  gotophoto() {
    this.homeWorks.student_id = this.student_id
    this.navCtrl.push('PhotoListPage', {
      student_id: this.student_id
    });
  }


  

  addhomework(homeworkName:string):void{

    this.eventProvider.addhomework(homeworkName,this.currentEvent.id,this.homeworkPicture).then(newhomework=>{
    this.homeworkName="";
    this.homeworkPicture=null;
    });
    
    }


  

}