import { Component, OnInit } from '@angular/core';
import { LoginServicio } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;   //true si esa logeado, false si no
  loggedInUser: string;  //variable del usuario que esta loggeado
  permitirRegistro: boolean;


  constructor(private loginServicio: LoginServicio,
              private router: Router, 
              private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit() {
    this.loginServicio.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
      
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    });

  }

  logout(){
    this.loginServicio.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
