import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
     loading: any;
  isLoggedIn = false;

  constructor (public navCtrl: NavController,
                public authService: AuthService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController) {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout().then((result) => {
      this.loading.dismiss();
      this.navCtrl.navigateRoot('/login');
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  async presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
