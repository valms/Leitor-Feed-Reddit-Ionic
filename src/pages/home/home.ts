import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public redditResponseFeed: Array<any>;
  private url: string = "https://www.reddit.com/new.json";

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {

    this.lerFeedReddit();

  }

  lerFeedReddit(): void {
    let animacaoCarregamento = this.loadingCtrl.create({
      content: 'Carregando Conteúdo...'
    });

    animacaoCarregamento.present();

    this.conveterFeedJson(animacaoCarregamento);

  }

  conveterFeedJson(animacaoCarregamento: Loading): void {
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.redditResponseFeed = data.data.children;

        this.redditResponseFeed.forEach((e, i, a) => {
          if (!e.data.thumbnail || e.data.thumbnail.indexOf('b.thumbs.redditmedia.com') === -1) {
            e.data.thumbnail = 'http://www.redditstatic.com/icon.png';
          }
        })
        // Após ler o feed, dispensar a animação
        animacaoCarregamento.dismiss();
      });
  }

}