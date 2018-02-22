import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

@Injectable()
export class EventProvider {
  public eventListRef: Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  createEvent(
    studentName: string,
    studentId: number
  ): ThenableReference {
    return this.eventListRef.push({
      name: studentName,
      Id: studentId * 1,
    });
  }

  getEventList(): Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }

  addhomework(homeworkName: string, eventId: string, homeworkPicture: string = null
  ): PromiseLike<any> {
    return this.eventListRef
      .child(`${eventId}/guestList`)
      .push({ homeworkName, eventId }) //added eventId
      .then(newhomework => {
        if (homeworkPicture != null) {
         firebase
            .storage()
            .ref(`/guestProfile/${newhomework.key}/Picture.png`)
            .putString(homeworkPicture,'base64', {contentType: 'image/png'})
            .then(savedPicture => {
              this.eventListRef.child(`${eventId}/guestList/${newhomework.key}`).update({
                picture: savedPicture.downloadURL,
              })
            });
            return 
          }        
  
      });

      
  }

  
  getPhotoList(): firebase.database.Reference {
    //return this.eventListRef.child(`/guestProfile/`);
    return this.eventListRef.child(`/guestList`);
  }

 


   
  


  
  }

