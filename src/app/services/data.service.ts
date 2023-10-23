import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private regiones = [
    {"id":3,"nombre":"Antofagasta"},
    {"id":1,"nombre":"Arica y Parinacota"},
    {"id":4,"nombre":"Atacama"},
    {"id":5,"nombre":"Coquimbo"},
    {"id":8,"nombre":"Libertador General Bernardo O'Higgins"},
    {"id":9,"nombre":"Maule"},
    {"id":7,"nombre":"Metropolitana de Santiago"},
    {"id":15,"nombre":"Región de Aysén del General Carlos Ibáñez del Campo"},
    {"id":12,"nombre":"Región de La Araucanía"},
    {"id":14,"nombre":"Región de Los Lagos"},
    {"id":13,"nombre":"Región de Los Ríos"},
    {"id":16,"nombre":"Región de Magallanes y de la Antártica Chilena"},
    {"id":10,"nombre":"Región de Ñuble"},
    {"id":11,"nombre":"Región del Biobío"},
    {"id":2,"nombre":"Tarapacá"},
    {"id":6,"nombre":"Valparaíso"}]
    // ... (otros datos de regiones)
  ;

  private comunas = [
    {"id":291,"nombre":"Santiago"},
    {"id":292,"nombre":"Cerrillos"},
    {"id":293,"nombre":"Cerro Navia"},
    {"id":294,"nombre":"Conchalí"},
    {"id":295,"nombre":"El Bosque"},
    {"id":296,"nombre":"Estación Central"},
    {"id":297,"nombre":"Huechuraba"},
    {"id":298,"nombre":"Independencia"},
    {"id":299,"nombre":"La Cisterna"},
    {"id":300,"nombre":"La Florida"},
    {"id":301,"nombre":"La Granja"},
    {"id":302,"nombre":"La Pintana"},
    {"id":303,"nombre":"La Reina"},
    {"id":304,"nombre":"Las Condes"},
    {"id":305,"nombre":"Lo Barnechea"},
    {"id":306,"nombre":"Lo Espejo"},
    {"id":307,"nombre":"Lo Prado"},
    {"id":308,"nombre":"Macul"},
    {"id":309,"nombre":"Maipú"},
    {"id":310,"nombre":"Ñuñoa"},
    {"id":311,"nombre":"Pedro Aguirre Cerda"},
    {"id":312,"nombre":"Peñalolén"},
    {"id":313,"nombre":"Providencia"},
    {"id":314,"nombre":"Pudahuel"},
    {"id":315,"nombre":"Quilicura"},
    {"id":316,"nombre":"Quinta Normal"},
    {"id":317,"nombre":"Recoleta"},
    {"id":318,"nombre":"Renca"},
    {"id":319,"nombre":"San Joaquín"},
    {"id":320,"nombre":"San Miguel"},
    {"id":321,"nombre":"San Ramón"},
    {"id":322,"nombre":"Vitacura"},
    {"id":323,"nombre":"Puente Alto"},
    {"id":324,"nombre":"Pirque"},
    {"id":325,"nombre":"San José de Maipo"},
    {"id":326,"nombre":"Colina"},
    {"id":327,"nombre":"Lampa"},
    {"id":328,"nombre":"Til Til"},
    {"id":329,"nombre":"San Bernardo"},
    {"id":330,"nombre":"Buin"},
    {"id":331,"nombre":"Calera de Tango"},
    {"id":332,"nombre":"Paine"},
    {"id":333,"nombre":"Melipilla"},
    {"id":334,"nombre":"Alhué"},
    {"id":335,"nombre":"Curacaví"},
    {"id":336,"nombre":"María Pinto"},
    {"id":337,"nombre":"San Pedro"},
    {"id":338,"nombre":"Talagante"},
    {"id":339,"nombre":"El Monte"},
    {"id":340,"nombre":"Isla de Maipo"},
    {"id":341,"nombre":"Padre Hurtado"},
    {"id":342,"nombre":"Peñaflor"}
    
    // ... (otros datos de comunas)
  ];

  constructor() { }

  getRegionNombrePorId(regionId: number): string {
    const region = this.regiones.find(region => region.id === regionId);
    return region ? region.nombre : '';
  }

  getComunaNombrePorId(comunaId: number): string {
    const comuna = this.comunas.find(comuna => comuna.id === comunaId);
    return comuna ? comuna.nombre : '';
  }
}




