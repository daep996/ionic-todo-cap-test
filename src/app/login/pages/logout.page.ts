import { AuthService } from '../../service/auth.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-logout',
  template: '',
  standalone: true
})
export class LogoutPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      await this.authService.logout()
      await this.router.navigate(['/login'])
    } catch (error) {
      console.error('Error during logout:', error)
      await this.router.navigate(['/login'])
    }
  }
}