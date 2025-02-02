import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';

import { SuperTabsModule } from 'ionic2-super-tabs';                  // Las tabs que se pueden deslizar
import { BarcodeScanner } from '@ionic-native/barcode-scanner';       // La funcionalidad de Cordova para escanear

import { ClientService } from '../services/client.services';
import { ProductoService } from '../services/producto.services';
import { ProductoPage } from '../pages/producto/producto';
import { AboutPageModule } from '../pages/about/about.module';
import { AboutPage } from '../pages/about/about';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,

    // Pages
    //HomePage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HomePageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    // Pages
    HomePage,
  ],
  providers: [    // Services
    StatusBar,
    SplashScreen,
    BarcodeScanner,   // NECESARIO PARA QUE FUNCIONE
    ProductoService,
    ClientService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
