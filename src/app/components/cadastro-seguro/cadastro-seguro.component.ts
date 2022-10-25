import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaCarro } from 'src/app/models/marcaCarro';
import { Seguro } from 'src/app/models/Seguro';
import { MarcaCarroService } from 'src/app/services/marca-carro.service';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.css']
})
export class CadastroSeguroComponent implements OnInit {

  public seguro = new Seguro();
  public marcasCarro$!: Observable<MarcaCarro[]>

  constructor(
    private marcaCarroService: MarcaCarroService
  ) { }

  ngOnInit() {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

}
