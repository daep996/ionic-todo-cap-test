import { checkmarkCircle, pricetag, logOut } from 'ionicons/icons'
import { Component } from '@angular/core'
import { addIcons } from 'ionicons'
import {
  IonApp,
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonContent,
    IonIcon,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    RouterLink,
  ],
  standalone: true,
})
export class AppComponent {
  public appPages = [
    { title: 'Tasks', url: '/tasks', icon: 'checkmark-circle' },
    { title: 'Categories', url: '/categories', icon: 'pricetags' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ]

  constructor() {
    addIcons({
      'checkmark-circle': checkmarkCircle,
      'log-out': logOut,
      pricetags: pricetag,
    })
  }
}
