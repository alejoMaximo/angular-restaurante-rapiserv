import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  registrarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registrarUsuario = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repetirPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    form: AbstractControl
  ): { [key: string]: any } | null => {
    const password = form.get('password')?.value;
    const repetirPassword = form.get('repetirPassword')?.value;

    return password && repetirPassword && password !== repetirPassword
      ? { passwordMismatch: true }
      : null;
  };

  registrar() {
    if (this.registrarUsuario.invalid) {
      return;
    }

    const { username, email, password } = this.registrarUsuario.value;

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return user.user?.updateProfile({
          displayName: username,
        });
      })
      .then(() => {
        this.router.navigate(['/login']);
        console.log('Usuario registrado');
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            this.toastr.error('Usuario ya registrado', 'Error');
            break;
          case 'auth/weak-password':
            this.toastr.error('Contraseña débil', 'Error');
            break;
          case 'auth/internal-error':
            this.toastr.error('Correo no válido', 'Error');
            break;
          default:
            this.toastr.error('Error desconocido', 'Error');
            break;
        }
      });
  }
}
