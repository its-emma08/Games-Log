import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    console.log('Iniciar sesion', this.email, this.password);

    if (this.email === 'admin' && this.password === 'admin') {
      this.router.navigate(['/home']);
    }else{
      alert('correo o contraseña incorrecta');
    }
  }

  ngOnInit() {
  }

}
