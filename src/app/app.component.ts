import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from "angularfire2/auth";

//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { EquipeListaPage } from "../pages/equipe-lista/equipe-lista";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    afAuth: AngularFireAuth) {

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = EquipeListaPage;
        //authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        //authObserver.unsubscribe();
      }
      authObserver.unsubscribe();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

