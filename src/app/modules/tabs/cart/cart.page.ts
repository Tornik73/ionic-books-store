import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  paymentAmount = '3.33';
  currency = 'USD';
  currencyIcon = '$';
  card = {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2020,
    cvc: '220'
  };
  stripeResponse;
  constructor(private payPal: PayPal, private stripe: Stripe) {
      this.stripe.setPublishableKey('pk_test_uwjRZA128Nvmq3111lJLJxhs00rQ8H9M7T');
  }

  ngOnInit() {
  }


  payWithStripe() {
    this.stripe.createCardToken(this.card)
    .then(token => {console.log(token); this.stripeResponse = token; })
    .catch(error => console.error(error));
  }
  payWithPaypal() {
    console.log('Pay ????');
    this.payPal.init({
      PayPalEnvironmentProduction: 'AYeAWQ0fy-tqcJCEbHTjB8thKMzx8Pd_HF9YwylYBoyyo7U0gNE15j3qVKoAztnqF1jqmlAFxQDwqVSl',
      PayPalEnvironmentSandbox: 'AWGES_XlbN2bD1KLqL6fQPM8mwAUXVsd57yWGJrlZ8UrmH3flztZZvdp-zI32gXgUTZyja-WUm0ervR1'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      })).then(() => {
        const payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
