import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CountryPhone } from '../../../shared/models/country-phone.model';
import { PasswordValidator } from '../../../shared/validators/password.validator';
import { PhoneValidator } from 'src/app/modules/shared/validators/phone.validator';
import { ToastController } from '@ionic/angular';
import { HTTPRequestsService } from '../../../shared/services/index';
import { User } from '../../../shared/models/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validationsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;
  sendingRequest = false;
  validationMessages: object = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    lastname: [
      { type: 'required', message: 'Last name is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    age: [
      { type: 'required', message: 'Age is required.' },
      { type: 'min', message: 'You must be >18 years old.' },
      { type: 'max', message: 'Uhh... really? Please, enter correct age :)' },
    ],
    phone: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],

  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    private requestServ: HTTPRequestsService
  ) { }

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'You successfully registered',
      duration: 2000,
      color: 'dark',
      showCloseButton: true,
      cssClass: 'margin-bottom: 100px;',
    });
    toast.present();
  }

  ngOnInit() {
    this.countries = [
      new CountryPhone('UA', 'Ukraine'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('GB', 'Britain')
    ];

    this.genders = [
      'Male',
      'Female'
    ];

    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    const countryControl = new FormControl(this.countries[0], Validators.required);
    const phoneControl = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(countryControl)
    ]));
    this.countryPhoneGroup = new FormGroup({
      country: countryControl,
      phone: phoneControl
    });

    this.validationsForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(18),
        Validators.max(150)
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.countryPhoneGroup,
      matching_passwords: this.matchingPasswordsGroup,
      terms: new FormControl(true, Validators.pattern('true'))
    });

  }


  onSubmit(values) {

    this.sendingRequest = true;
    const corectValues: User = {
      email: values.email,
      name: values.name,
      lastname: values.lastname,
      password: values.matching_passwords.password,
      age: values.age,
      telephone: values.country_phone.phone,
      gender: values.gender,
      username: values.username,
      country: values.country_phone.country.name
    };

    const registerSubcription = this.requestServ.httpUsersPost(corectValues)
      .subscribe(() => {
        setTimeout(() => {
          this.validationsForm.reset(this.validationsForm);
          this.presentToast();
          this.sendingRequest = false;
          this.router.navigate(['']);
        }, 3000);
      });

  }
}
