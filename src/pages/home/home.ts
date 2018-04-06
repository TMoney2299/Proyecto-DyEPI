import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pages = [
    { pageName: 'HelpPage', title: 'Ayuda', icon: 'help', id: 'HelpTab' },
    { pageName: 'MapaPage', title: 'Mapa', icon: 'locate', id: 'MapaTab' },
    { pageName: 'CatalogoPage', title: 'Catalogo', icon: 'shirt', id: 'CatalogoTab' },
    { pageName: 'CarritoPage', title: 'Carrito', icon: 'cart', id: 'CarritoTab' }
  ];

  selectedTab = 1;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  qrData = null;
  scannedCode = null;
  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCrtl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private pform: Platform,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private superTabsCtrl: SuperTabsController,
  ){
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.

    if(navParams.get('tabSeleccionada')!=undefined){      // Si vuelvo a home con parametro. EJ: Producto seleccionado, para ir a carrito.
      const tabGo = navParams.get('tabSeleccionada');    // Recibe el valor de QR
      console.log("TENGO QUE IR A "+tabGo);

      for (let index = 0; index < this.pages.length; index++) {
        if(this.pages[index].id === tabGo){
          console.log("Encontrado indice: "+tabGo+" en pos: "+index);
          this.superTabsCtrl.slideTo(index); 
          break;
        }
      }
     
    }

  }

  readCode(){           // Boton flotante FAB para leer un QR y a la vuelta abrir el enlace correspondiente
    this.barcodeScanner.scan().then((barcodeData) => {
      if(barcodeData.cancelled){
        alert("NO ES QR!!");
      }
      else {
        alert("Ir a la vista del producto leido.");
        this.navCtrl.push('ProductoPage', {contenido: barcodeData});  // No se puede rootNavCtrl, sino no va.
      }
    });

  }

  onTabSelected(ev: any) {
    this.selectedTab = ev.index;
  }

}