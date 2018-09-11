import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/finally';

@Injectable()

export class OffersService {
  loader = false;
  constructor(private http: HttpClient, private authService: AuthService) {}

   // get users count
   getOffersCount() {
    return this.http.get(environment.apiPath + 'offers/number-of-all-offers/count')
    .pipe(map(
      (response: Response) => {
        const data = response;
        // console.log(data);
        return data;
      },
      (error) => console.log(error)
    ));
  }

  // get all offers
  getUsers() {
    return this.http.get(environment.apiPath + 'offers')
    .pipe(map(
      (response: Response) => {
        const data = response;
        console.log(data);
        return data;
      },
      (error) => console.log(error)
    ));
  }

  // get one offer
  offerDetails(id) {
    return this.http.get(environment.apiPath + 'offers/' + id)
    .pipe(map(
      (response: Response) => {
        const data = response;
        return data;
      },
      (error) => console.log(error)
    ));
  }

  updateOffer(offer, imgs) {
    const _formData = new FormData();

    // _formData.append('imgs', offer.imgs);
    for (let i = 0; imgs && i < imgs.length; i++) {
      _formData.append('imgs', imgs[i], imgs[i]['name']);
    }

    _formData.append('title', offer.title);
    _formData.append('brandName', offer.brandName);
    _formData.append('discound', offer.discound);
    _formData.append('pricepreDisc', offer.pricepreDisc);
    _formData.append('pricepostDisc', offer.pricepostDisc);
    _formData.append('desc', offer.desc);
    console.log(_formData);

    return this.http.put(environment.apiPath + 'offers/' + offer._id, _formData)
      .pipe(map(
        (response: Response) => {
          const data = response;
          console.log('offer updates');
          return data;
        },
        (error) => console.log(error),
      ));
  }

    // add one offer
  addOffer(offer, imgs) {
    const _formData = new FormData();

    // _formData.append('imgs', offer.imgs);
    for (let i = 0; imgs && i < imgs.length; i++) {
      _formData.append('imgs', imgs[i], imgs[i]['name']);
    }

    _formData.append('title', offer.title);
    _formData.append('brandName', offer.brandName);
    _formData.append('discound', offer.discound);
    _formData.append('pricepreDisc', offer.pricepreDisc);
    _formData.append('pricepostDisc', offer.pricepostDisc);
    _formData.append('desc', offer.desc);
    console.log(_formData);
    return this.http.post(environment.apiPath + 'offers/', _formData)
      .pipe(map(
        (response: Response) => {
          const data = response;
          console.log('formdata response' + response);
          return data;
        },
        (error) => console.log(error)
      ));
  }


  // delete one offer
  // deleteOffer(id) {
  //   return this.http.delete(environment.apiPath + 'offers/' + id)
  //   .pipe(map(
  //     (response: Response) => {
  //       const data = response;
  //       console.log("user deleted");
  //       return data;
  //     },
  //     (error) => console.log(error)
  //   ));
  // }
}
