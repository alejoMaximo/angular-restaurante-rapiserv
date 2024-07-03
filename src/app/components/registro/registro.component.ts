import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.registrarUsuario = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    });
  }
  registrar() {
    const username = this.registrarUsuario.value.username;
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if (password !== repetirPassword) {
      return;
    }

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return user.user?.updateProfile({
          displayName: username
        })
      }).then(()=>{
        this.router.navigate(['/login']);
        console.log('usuario registrado')
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
