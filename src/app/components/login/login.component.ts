import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  verificar: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['/inicio']);
      })
      .catch((error) => {
        const errorCode = error.code; // El código de error


        switch (errorCode) {
          case 'auth/user-not-found':
            this.toastr.error('Usuario/Contraseña invalida', 'Error');
            break;
          case 'auth/wrong-password':
            this.toastr.error('Usuario/Contraseña invalida', 'Error');
            break;
          case 'auth/invalid-email':
            this.toastr.error(
              'No hay correo valido o llena todos los campos',
              'Error'
            );
            break;
          case 'auth/invalid-login-credentials':
            this.toastr.error(
              'El correo o contraseña no son correctos',
              'Error'
            );
            break;
          case 'auth/invalid-credential':
            this.toastr.error(
              'El correo o contraseña no son correctos',
              'Error'
            );
            break;
          case 'auth/missing-password':
            this.toastr.error('Digita la contraseña', 'Error');
            break;
          default:
            console.log('Ocurrió un error desconocido');
            break;
        }
      });
  }
}
