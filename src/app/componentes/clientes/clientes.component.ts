import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;

  @ViewChild("botonCerrar") botonCerrar: ElementRef;


  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit() {

    //getClientes nos devolvera la lista de clientes, pero nos tenemos quwe subscribir al servicio
    //En clientes nos devuelve el listado e inicializamos la variable this.clientes
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal:number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){

    if(!valid){
      this.flashMessages.show('Por favor, llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }else{
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
    
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }


}
