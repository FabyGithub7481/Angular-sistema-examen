import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private loginService: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.email.trim() == '' ||
      this.loginData.email.trim() == null
    ) {
      this.snack.open('El nombre de usuario es requerido!!!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('El password es requerido!!!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);
          if (this.loginService.getUserRole() == 'ADMIN') {
            window.location.href = './admin';
          } else if (this.loginService.getUserRole() == 'NORMAL') {
            window.location.href = './user-dashboard';
          } else {
            this.loginService.logout();
          }
        });
      },
      (error) => {
        this.snack.open('Detalles invalidos, vuelva a intentar', 'Aceptar', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }
}
