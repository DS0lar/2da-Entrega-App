import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { LocationService } from 'src/app/services/location.service';


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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private locationService:LocationService
    ) { 
      this.formularioRegistro = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'apellido': new FormControl("", Validators.nullValidator),
        'user': new FormControl("", Validators.required),
        'password': new FormControl("", Validators.required),
        'confirmacionPassword': new FormControl("", Validators.required),
        'region': new FormControl(null, Validators.required),
        'comuna': new FormControl(null, Validators.required)
      }, { validator: passwordMatchValidator });
  }

  ngOnInit() {
    this.cargarRegion();
  }
  
  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }

  async guardar(){
    var f = this.formularioRegistro.value;  
    var usuario = {
      nombre: f.nombre,
      apellido: f.apellido,
      user: f.user,
      password: f.password,
      region: f.region, // Agrega la región seleccionada al objeto de usuario
      comuna: f.comuna
      
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
