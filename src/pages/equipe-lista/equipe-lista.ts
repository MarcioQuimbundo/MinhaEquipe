import { Component } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, LoadingController } from 'ionic-angular';

//Providers
import { EquipeServiceProvider } from "../../providers/equipe-service/equipe-service";
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";

//Pages
// import { EquipePage } from "../equipe/equipe";

//Models
import { Equipe } from "../../models/equipe";
import { SessaoServiceProvider } from "../../providers/sessao-service/sessao-service";

import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-equipe-lista',
  templateUrl: 'equipe-lista.html',
})
export class EquipeListaPage {
  private equipes: Equipe[] = [];
  private subscriptionEquipes: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuarioServiceProvider,
    private equipeService: EquipeServiceProvider,
    private sessaoService: SessaoServiceProvider) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Carregando equipes...'
    // });

    // loading.present();

    // this.equipeService.getAll(this.usuarioService.getUsuarioAplicacao().$key).subscribe((data: Equipe[]) => {
    //   console.log("data")
    //   this.equipes = data;
    //   loading.dismiss();
    // });
  }



  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando equipes...'
    });

    loading.present();

    this.subscriptionEquipes = this.equipeService.getAll(this.usuarioService.getUsuarioAplicacao().$key).subscribe((data: Equipe[]) => {
      console.log("data")
      this.equipes = data;
      loading.dismiss();
    });
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave")
    this.subscriptionEquipes.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipeListaPage');
  }

  public novaEquipe() {
    this.navCtrl.push('EquipePage');
  }

  editarEquipe(equipe: Equipe) {
    let loading = this.loadingCtrl.create({
      content: 'Carregando equipe...'
    });

    loading.present();

    this.sessaoService.setEquipeKey(equipe.$key).then(dataEquipe => {
      loading.dismiss();
      this.navCtrl.setRoot('TabsPage')
    });
  }
}
