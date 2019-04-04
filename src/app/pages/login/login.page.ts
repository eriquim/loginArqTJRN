import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from '../../services/auth-service.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;

    loading: any;

    data: any;

    constructor(private router: Router,
        private authService: AuthService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private formBuilder: FormBuilder, ) { }

    doLogin(form: NgForm) {
        this.showLoader();
        this.authService.login(form).subscribe(res => {
            if (res.token) {
                console.log('Resposta: Logou!');
                localStorage.setItem('token', res.token);
                this.router.navigate(['tabs']);
                this.loading.dismiss();
            } else {
                this.loading.dismiss();
                this.presentToast('Comportamento inesperado');
            }
        }, (err) => {
            console.log(err);
        });


        //     this.authService.login(this.loginData).then((result) => {
        //         this.data = result;
        //         console.log('Resposta: ' + this.data);
        //         this.loading.dismiss();
        //         localStorage.setItem('token', this.data.access_token);
        //         this.router.navigate(['/tabs']);
        //     }, (err) => {
        //         console.log('Resposta Erro: ' + this.data + ' Msg: ' + err);
        //         this.loading.dismiss();
        //         this.presentToast(err);
        //     });
        // }
    }

    async showLoader() {
        this.loading = await this.loadingCtrl.create({
            message: 'Autenticando no Servidor...'
        });

        this.loading.present();
    }

    async presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: 'Erro: ' + msg,
            duration: 2000
        });
        toast.present();
    }



    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });

    }

}
