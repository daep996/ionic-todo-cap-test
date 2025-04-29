import { Injectable } from '@angular/core';
import { 
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) {
    auth.onAuthStateChanged((user) => {
      this.isAuthenticated.next(!!user)
    });
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password)
      return result
    } catch (error) {
      throw error
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return result
    } catch (error) {
      throw error
    }
  }

  logout() {
    return signOut(this.auth)
  }

  isAuthenticatedUser() {
    return this.isAuthenticated.asObservable()
  }
}