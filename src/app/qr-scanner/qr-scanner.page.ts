import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';
import { DataService } from './../services/data.service';
/*npm install @zxing/library*/ 

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  
  

  qrResult: string = ''; // Variable para almacenar el resultado del escaneo de QR
  codeReader: BrowserMultiFormatReader;
  isScanning: boolean = false;
  userData: {
    nombre: string;
    apellido: string;
    carrera: string;
    rut: string;
    datosEscaneados?: string[]; // Agrega datosEscaneados con el operador '?' para que sea opcional
    region?: string; // Tipo de datos para la propiedad region
    comuna?: string;
  } = {
    nombre: '',
    apellido: '',
    carrera: '',
    rut: '',
  };// Inicializa 'userData' con propiedades predeterminadas

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;

  constructor(private dataService: DataService,) {
    
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.getUserInfo(); // Cargamos los datos del alumno al inicio

    // Obtener ubicación del usuario al iniciar la página
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Actualizar el contenido de los elementos en el HTML con las coordenadas
          const latitudeElement = document.getElementById('latitude');
          const longitudeElement = document.getElementById('longitude');

          if (latitudeElement && longitudeElement) {
            latitudeElement.innerText = 'Latitud: ' + latitude;
            longitudeElement.innerText = 'Longitud: ' + longitude;
          }
          
          // Puedes hacer lo que quieras con las coordenadas aquí, por ejemplo, almacenarlas en el Local Storage
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());
        },
        (error) => {
          console.error(error);
          // Manejar errores aquí si la obtención de ubicación falla
        }
      );
    } else {
      console.error('Geolocalización no es compatible en este navegador.');
      // Manejar casos donde la geolocalización no es compatible
    }
  }

  

  scanned: boolean = false;
  showInfo: boolean = false; 
  openScanner() {
    if (this.videoElement) {
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});
  
      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          this.qrResult = result.getText();
          const datosEscaneados = this.qrResult.split(',');
  
          this.userData = {
            ...this.userData,
            datosEscaneados: datosEscaneados,
          };
  
          localStorage.setItem('userData', JSON.stringify(this.userData));
          this.getUserInfo();
  
          this.showInfo = true;
          setTimeout(() => {
            this.closeScanner();
          }, 0);
        })
        .catch((error: any) => {
          console.error(error);
        });
  
      this.isScanning = true;
      this.scanned = true;
    }
    
  }
  
  closeScanner() {
    this.codeReader.reset();
    this.qrResult = '';
    this.isScanning = false; // Agrega esta línea para ocultar la visualización de video
  }

  getUserInfo() {
    // Obtén la información del usuario desde el Local Storage
    const userInfoString = localStorage.getItem('usuario');
    
    if (userInfoString) { // Verifica si userInfoString no es nulo
      const userInfo = JSON.parse(userInfoString);
      const regionId = userInfo.region;
      const comunaId = userInfo.comuna;

      const regionNombre = this.dataService.getRegionNombrePorId(regionId);
      const comunaNombre = this.dataService.getComunaNombrePorId(comunaId);
      
  
      // Combina los datos del alumno y los datos escaneados en 'userData'
      this.userData = {
        ...this.userData, // Mantén los datos anteriores en 'userData'
        ...userInfo, // Agrega los datos del alumno
        datosEscaneados: this.qrResult.split(','),
        region: regionNombre,
        comuna: comunaNombre // Agrega los datos escaneados
       
      };
    }
  }
}

 