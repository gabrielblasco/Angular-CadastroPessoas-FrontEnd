import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/components/excluir/excluir.component';
import { ClienteModel } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{


  clientes: ClienteModel[] = [];
  clientesGeral: ClienteModel[] = [];
  colunas = ['Ativo', 'Nome','Data de Nascimento','Valor Renda' ,'CPF', 'Editar', 'Excluir']

  constructor ( private clienteService: ClienteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {

      this.clientes = data.dados;
      this.clientesGeral = data.dados;

    });
  }

  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.clientes = this.clientesGeral.filter(clienteTela => {
      return clienteTela.nome.toLowerCase().includes(value);
    })
  }

  openDialog(id: number) {
    this.dialog.open(ExcluirComponent, {
      width: '350px',
      height: '350px',
      data: {
        id: id
      }

    });

  }
}
