import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'; // Para móviles
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'; // Firebase Modular
import { NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { environment } from '../../environments/environment';

// Declarar gapi y google para la web
declare var gapi: any;
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private navController: NavController) { }

  login() {
    if (this.email === 'admin' && this.password === 'admin') {
      this.navController.navigateForward('/home');
    }
  }


  // Iniciar sesión con Google (Web y móvil)
  async signInWithGoogle() {
    try {
      if (Capacitor.getPlatform() === 'web') {
        // Web: Usamos Google Identity Services
        google.accounts.id.prompt(); // Mostrar el prompt de inicio de sesión
      } else if (Capacitor.isNativePlatform()) {
        // Móvil: Usamos Capacitor Google Auth
        const user = await GoogleAuth.signIn();
        console.log('Usuario logueado en móvil:', user);

        // Autenticación en Firebase
        const credential = GoogleAuthProvider.credential(user.idToken);
        const auth = getAuth();  // Usar la API Modular
        await signInWithCredential(auth, credential);  // Iniciar sesión en Firebase
        this.navController.navigateForward('/home');  // Navegar después de login
      }
    } catch (error) {
      console.error("Error al autenticar con Google en Firebase:", error);
    }
  }

  // Cargar Google Sign-In solo para la web
  loadGoogleSignIn() {
    if (Capacitor.getPlatform() === 'web') {
      google.accounts.id.initialize({
        client_id: '1095247217419-4lkpl9p8lthheufejuns3f7bdp9o3m9k.apps.googleusercontent.com', // Tu client_id de Google
        callback: (response: { credential: string }) => {
          const credential = GoogleAuthProvider.credential(response.credential);
          const auth = getAuth();  // Usar la API Modular
          signInWithCredential(auth, credential)
            .then(() => {
              this.navController.navigateForward('/home'); // Navegar después de login
            })
            .catch((error) => {
              console.error('Error al autenticar con Google en Firebase:', error);
            });
        },
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"), 
        { theme: "outline", size: "large" } // Configuración del botón
      );
    }
  }

  ngOnInit() {
    if (Capacitor.getPlatform() === 'web') {
      this.loadGoogleSignIn();
    }
  }
}
