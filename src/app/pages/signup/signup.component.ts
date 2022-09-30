import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    userName: '',
    password: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.userName === '' || this.user.userName === null) {
      this.snack.open('El nombre de usuario es requerido!!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Usuario guardado',
          'Usuario registrado en el sistema',
          'success'
        );
      },
      (error) => {
        console.log(error);
        this.snack.open('ha ocurrido un error en el sistema!!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}
