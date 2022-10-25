import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { Seguro } from '../models/Seguro';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private API_SEGUROS = 'http://localhost:9000'
  private db!: Dexie
  private table!: Dexie.Table<Seguro, any>


  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService
  ) { 
    this.ouvirStatusConexao();
    this.iniciarIndexedDb();
  }

  private iniciarIndexedDb() {
    this.db = new Dexie('db-seguros');
    this.db.version(1).stores({
      seguro: 'id'
    });

    this.table = this.db.table('seguro')
  }

  private salvarAPI(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + '/api/seguros', seguro)
      .subscribe(
        () => alert('Seguro cadastrado com sucesso'),
        (err) => console.log(err)
      )
  }

  private async salvarIndexedDb(seguro: Seguro) {
    try{
      await this.table.add(seguro)
      const todosSeguros: Seguro[] = await this.table.toArray()
      console.log('Seguro foi salvo no IndexedDb', todosSeguros)
    } catch (error) {
      console.log('Erro ao incluir seguro ao indexedDb', error)
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosSeguros: Seguro[] = await this.table.toArray()
    for(const seguro of todosSeguros) {
      this.salvarAPI(seguro)
      await this.table.delete(seguro.id)
      console.log(`Seguro com id ${seguro.id} foi excluido com sucesso.`)
    }
  }

  public salvar(seguro: Seguro) {
    if(this.onlineOfflineService.isOnline) {
      this.salvarAPI(seguro)
    } else {
      this.salvarIndexedDb(seguro);
    }
  }

  cadastrar(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + '/api/seguros', seguro)
      .subscribe(
        () => alert('Seguro cadastrado com sucesso'),
        (err) => console.log(err)
      )
  }

  listar(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(this.API_SEGUROS + '/api/seguros');
  }

  private ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao
      .subscribe(online => {
        if(online) {
          this.enviarIndexedDbParaApi();
        } else {
          console.log('Esotu offline')
        }
      })
  }
}
