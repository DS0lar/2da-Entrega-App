import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmacionPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  formularioRegistro: FormGroup;

  nombreGuardado: string = '';
  apellidoGuardado: string = '';
  userGuardado: string = '';

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router
    ) { 
    // Obtener datos guardados del localStorage
    const usuarioGuardadoString = localStorage.getItem('usuario');
    if (usuarioGuardadoString) {
      const usuarioGuardado = JSON.parse(usuarioGuardadoString);
      this.nombreGuardado = usuarioGuardado.nombre || '';
      this.apellidoGuardado = usuarioGuardado.apellido || '';
      this.userGuardado = usuarioGuardado.user || '';
    }

    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl({ value: this.nombreGuardado, disabled: true }, Validators.required),
      'apellido': new FormControl({ value: this.apellidoGuardado, disabled: true }, Validators.nullValidator),
      'user': new FormControl({ value: this.userGuardado, disabled: true }, Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    }, { validator: passwordMatchValidator });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;  
    var usuario = {
      nombre: this.nombreGuardado,
      apellido: this.apellidoGuardado,
      user: this.userGuardado,
      password: f.password
    }
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'debes ingresar datos validos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }else{
      localStorage.setItem('usuario',JSON.stringify(usuario));
      const alert = await this.alertController.create({
        message: 'Registrado exitosamente',
        buttons: ['Aceptar']
      })
      console.log("registrado");
      await alert.present();
      this.router.navigate(['/home']);
      return;
    }
  }
}
