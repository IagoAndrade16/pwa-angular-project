import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from '../models/Seguro';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private API_SEGUROS = 'http://localhost:9000'


  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService
  ) { 
    this.ouvirStatusConexao();
  }

  private salvarAPI(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + '/api/seguros', seguro)
      .subscribe(
        () => alert('Seguro cadastrado com sucesso'),
        (err) => console.log(err)
      )
  }

  public salvar(seguro: Seguro) {
    if(this.onlineOfflineService.isOnline) {
      this.salvarAPI(seguro)
    } else {
      console.log('Salvar seguro no banco local')
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
          console.log('enviando os dados do meu banco local para API')
        } else {
          console.log('Esotu offline')
        }
      })
  }
}
