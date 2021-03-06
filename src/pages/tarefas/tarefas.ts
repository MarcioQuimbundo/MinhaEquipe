import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';

//Pages
import { TarefaPage } from "../tarefa/tarefa";

//Services
import { SessaoServiceProvider } from "../../providers/sessao-service/sessao-service";
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";

//Enum
import { TarefaSituacao } from "../../app/app.constants";

//Models
import { Equipe } from "../../models/equipe";
import { Tarefa } from "../../models/tarefa";

import { TarefaServiceProvider } from "../../providers/tarefa-service/tarefa-service";

@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {
  private equipe: Equipe = new Equipe();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private sessaoService: SessaoServiceProvider,
    private usuarioService: UsuarioServiceProvider,

    public popoverCtrl: PopoverController,
    public tarefaService: TarefaServiceProvider) {

    this.equipe = this.sessaoService.equipe;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarefasPage');
  }

  novaTarefa() {
    this.navCtrl.push(TarefaPage);
  }

  editarTarefa(tarefa: Tarefa) {
    this.navCtrl.push(TarefaPage, {
      tarefa: tarefa.Copy()
    });
  }

  isAdministradorEquipe() {
    let retorno = this.equipe.keyResponsavel == this.usuarioService.getUsuarioAplicacao().$key;
    return retorno;
  }

  private corBadge(tarefaSituacao: TarefaSituacao) {
    if (tarefaSituacao == TarefaSituacao.Andamento) {
      return "cortarefaandamento";
    } else if (tarefaSituacao == TarefaSituacao.Cancelada) {
      return "cortarefacancelada";
    } else if (tarefaSituacao == TarefaSituacao.Finalizado) {
      return "cortarefafinalizado";
    } else if (tarefaSituacao == TarefaSituacao.Pendente) {
      return "cortarefapendente";
    }
    alert("erro");
    return '';
  }

  private descricaoBadge(tarefaSituacao: TarefaSituacao) {
    return TarefaSituacao[tarefaSituacao];
  }
}
