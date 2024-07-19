import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/models/cliente';
import { CustomErrorStateMatcher } from 'src/app/resources/custom-state-matcher';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit{
  /* envia dados do formulario para persistir*/
  @Output() onSubmit = new EventEmitter<ClienteModel>();

  @Input() btnAcao!: string;

  @Input() btnTitulo!: string;

  @Input() dadosCliente: ClienteModel | null = null;



  clienteForm!: FormGroup;

  customErrorStatematcher = new CustomErrorStateMatcher();

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      id:             new FormControl(this.dadosCliente? this.dadosCliente.id             : 0),
      nome:           new FormControl(this.dadosCliente? this.dadosCliente.nome           : '', Validators.required),
      dataNascimento: new FormControl(this.dadosCliente? this.dadosCliente.dataNascimento : '' ),
      ValorRenda:     new FormControl(this.dadosCliente? this.dadosCliente.valorRenda     : '' ),
      CPF:            new FormControl(this.dadosCliente? this.dadosCliente.cpf            : '' ),
      ativo:          new FormControl(this.dadosCliente? this.dadosCliente.ativo          : true)
    })
  }

  submit() {
    this.onSubmit.emit(this.clienteForm.value);
  }

}
