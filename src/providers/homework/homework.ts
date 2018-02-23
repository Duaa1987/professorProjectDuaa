import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';


@Injectable()
export class HomeworkProvider {
  public homeworkListRef: Reference;
  public student_id: string;

  constructor() { 
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.homeworkListRef = firebase
        .database()
        .ref(`/userProfile/${user.uid}/eventList/`);
    }
  }); }



  createEvent(
    studentName: string,
    studentId: number
  ): ThenableReference {
    return this.homeworkListRef.push({
      name: studentName,
      Id: studentId * 1,
    });
  }

  // get the reference of student id
  getHomeWorks(student_id: string) {
    return this.homeworkListRef.child(`${student_id}/guestList`)
  }

  getEventDetail(eventId: string): Reference {
    return this.homeworkListRef.child(eventId);
  }

  addhomework(homeworkName: string, eventId: string, homeworkPicture: string = null
  ): PromiseLike<any> {
    return this.homeworkListRef
      .child(`${eventId}/guestList`)
      .push({ homeworkName, eventId }) //added eventId
      .then(newhomework => {
        if (homeworkPicture != null) {
         firebase
            .storage()
            .ref(`/guestProfile/${newhomework.key}/Picture.png`)
            .putString(homeworkPicture,'base64', {contentType: 'image/png'})
            .then(savedPicture => {
              this.homeworkListRef.child(`${eventId}/guestList/${newhomework.key}`).update({
                picture: savedPicture.downloadURL,
              })
            });
            return 
          }        
  
      });

      
  }

  
  getPhotoList(): firebase.database.Reference {
    return this.homeworkListRef.child(`${this.student_id}/guestList`)
  }

 


   
  


  
  }

