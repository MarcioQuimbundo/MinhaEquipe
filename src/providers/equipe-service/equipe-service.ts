import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

import * as firebase from 'firebase';

//Models
//import { Usuario } from "../../models/usuario";

//Services
import { UserServiceProvider } from "../user-service/user-service";

//Models
import { Equipe } from "../../models/equipe";

@Injectable()
export class EquipeServiceProvider {
  private basePathEquipes: string = '/equipes';
  private basePathUsuarios: string = '/usuarios';


  private usuario: any = {};
  private usuarioId: string = ""

  private equipes: FirebaseListObservable<Equipe[]>;

  constructor(
    public db: AngularFireDatabase,
    public storage: Storage,
    private camera: Camera,
    private userProvider: UserServiceProvider) {
    console.log('Hello EquipeServiceProvider Provider');

    this.equipes = <FirebaseListObservable<Equipe[]>>this.db.list(this.basePathEquipes);
    console.log(this.basePathEquipes)
    
    this.userProvider.getuid().then((uid) => {
      //console.log(this.equipes)
      this.usuarioId = uid;
      console.log(uid)
    });
    console.log(this.basePathEquipes)
    
    /*
    this.db.list(this.basePathEquipes, {
      query: {
        orderByChild: 'eyeColor',
        equalTo: "eyeColor"
      }
    });
    */
  }

  public getAll(): FirebaseListObservable<Equipe[]> {
    console.log(this.equipes)
    return this.equipes;

    //this.userProvider.getuid().then((uid) => {
     //return this.db.list(this.basePathEquipes);
    //  console.log(this.equipes)
   // });
  }
//voltar ate aqui
  public save(equipe: Equipe, key: string, imagem: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userProvider.getuid().then((userUid) => {
        
        equipe.responsavel = userUid;

        if (!key) {
          //Se é Push
          key = this.db.database.ref(this.basePathEquipes).push().key;
        }

        if (imagem) {
          this.uploadImage(imagem, key).then((imageSnapshot: any) => {
            equipe.fotoUrl = imageSnapshot.downloadURL;

            this.update(equipe, key).then((dataEquipePush) => {
              resolve(dataEquipePush);
            }).catch((error) => {
              reject(error);
            });


          }).catch((error) => {
            reject(error);
          });
        } else {
          this.update(equipe, key).then((dataEquipePush) => {
            resolve(dataEquipePush);
          }).catch((error) => {
            reject(error);
          });
        }

      });
    });
  }
  private update(equipe: any, key: string) {
    var updates = {};
    updates[`${this.basePathEquipes}/${key}`] = equipe; //equipe
    // /equipes/_UidEquipe_

    updates[`${this.basePathUsuarios}/${equipe.responsavel}/equipes/${key}`] = true; //Atualiza Usuario administrador
    // /usuarios/_UidUsuario_/equipes/_UidEquipe_

    return this.db.database.ref().update(updates);
  }



  public remove(key: string) {
    this.equipes.remove(key);
  }




  public uploadImage(imageString: string, uid: string): Promise<any> {
    let storageRef: any;
    let parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref(`${this.basePathEquipes}/${uid}.jpg`);
      parseUpload = storageRef.putString(imageString, firebase.storage.StringFormat.DATA_URL);

      parseUpload.on('state_changed', (_snapshot) => {

      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }
  public pictureFromCamera() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    return this.camera.getPicture(cameraOptions);
    /*.then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      var stringzaum = 'data:image/jpeg;base64,' + imageData;
      console.log(stringzaum);
   //   this.captureDataUrl = 
    }, (err) => {
      // Handle error
    });*/
  }
  public pictureFromLibray() {
    const cameraOptions: CameraOptions = {
      // quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    return this.camera.getPicture(cameraOptions);
    /*
    .then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      var stringzaum = 'data:image/jpeg;base64,' + imageData;
      console.log(stringzaum);
   //   this.captureDataUrl = 
    }, (err) => {
      // Handle error
    });*/
  }
}
