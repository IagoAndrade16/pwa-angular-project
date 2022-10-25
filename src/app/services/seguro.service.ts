import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from '../models/Seguro';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private API_SEGUROS = 'http://localhost:9000'


  constructor(
    private http: HttpClient
  ) { }

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
}
