import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

    cliente = new Cliente();
    clientes:Cliente[] = [];

    btnCadastro:boolean = true;

    tabela:boolean = true;

    constructor(private servico:ClienteService){}

    select():void{
      this.servico.select()
      .subscribe(retorno => this.clientes = retorno);
    }

    create():void {
      this.servico.create(this.cliente)
      .subscribe(retorno => { 

        //create on vector(push)
        this.clientes.push(retorno); 

        //clean form
        this.cliente = new Cliente();
        alert('Created User')
      });
    }

    //select user on table
    selecionarCliente(posicao:number):void {
      this.cliente = this.clientes[posicao];

      this.btnCadastro = false;
      this.tabela = false;
    }

    edit():void{
      this.servico.edit(this.cliente)
      .subscribe(retorno => {
        //get position
        let position = this.clientes.findIndex(obj => {
          return obj.codigo == retorno.codigo;
        });

        //edit data
        this.clientes[position] = retorno;

        this.cliente = new Cliente;

        this.btnCadastro = true;
        this.tabela = true;
        alert("User edited!")
      });
    }

    remove():void{
      this.servico.remove(this.cliente.codigo)
      .subscribe(retorno => {
        //get position
        let position = this.clientes.findIndex(obj => {
          return obj.codigo == this.cliente.codigo;
        });

        //Delete User
        this.clientes.splice(position, 1);

        this.cliente = new Cliente;

        this.btnCadastro = true;
        this.tabela = true;
        alert("User deleted!")
      });
    }

    cancel():void {
      this.cliente = new Cliente();

      this.btnCadastro = true;

      this.tabela = true;
    }

    //init
    ngOnInit(){
      this.select();
    }

}
