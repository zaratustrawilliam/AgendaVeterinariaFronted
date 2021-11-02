import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

const BIENVENIDA_USUARIO = '!Bienvenido x a la veterinaria los GALGOS, Agende su cita pro favor!';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  nombreUsuario : string;

  constructor(private authservice : AuthService) { }

  ngOnInit() {
    this.nombreUsuario = this.authservice._getUserName();
    this.formarBienvenidaUsuario();
  }

  private formarBienvenidaUsuario(){
    this.nombreUsuario = BIENVENIDA_USUARIO.replace('x',this.nombreUsuario);
  }

}

