import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';

//Pages
import { LocalPage } from "../local/local";

//Models
import { Local } from "../../models/local";
import { Equipe } from "../../models/equipe";

//Service
import { SessaoServiceProvider } from "../../providers/sessao-service/sessao-service";
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";
import { LocalServiceProvider } from "../../providers/local-service/local-service";

@IonicPage()
@Component({
  selector: 'page-locais',
  templateUrl: 'locais.html',
})
export class LocaisPage {
  private equipe: Equipe;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sessaoService: SessaoServiceProvider,
    private usuarioService: UsuarioServiceProvider,
    private localService: LocalServiceProvider) {

    this.equipe = this.sessaoService.equipe;    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocaisPage');
  }

  novoLocal() {
    this.navCtrl.push(LocalPage);
  }

  editarLocal(local: Local) {
    this.navCtrl.push(LocalPage, {
      local: local.Copy(),
    });
  }

  isAdministradorEquipe() {
    let retorno = this.equipe.keyResponsavel == this.usuarioService.getUsuarioAplicacao().$key;
    return retorno;
  }
}
