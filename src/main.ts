import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router'
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone'
import { bootstrapApplication } from '@angular/platform-browser'
import firebaseConfig from './app/firebase/firebase.config'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { provideFirebaseApp } from '@angular/fire/app'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => firebaseConfig),
    provideAuth(() => getAuth())
  ],
});
