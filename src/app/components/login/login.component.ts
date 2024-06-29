import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private afAuth: AngularFireAuth
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
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
