import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  idTypeLabel;
  firstFlight;
  lastFlight;
  isIssueDateNeed: boolean;
  isExpireDateNeed: boolean;
  isCountryNeed: boolean;

  ID_TYPES = []

  NATIONALITIES = [
    {value: "af", label: "Afganistán"}, {value: "al", label: "Albania"}, {value: "de", label: "Alemania"}, {value: "ad", label: "Andorra"}, {value: "ao", label: "Angola"}, {value: "ai", label: "Anguila"}, {value: "aq", label: "Antártida"}, {value: "ag", label: "Antigua y Barbuda"}, {value: "an", label: "Antillas Neerlandesas"}, {value: "sa", label: "Arabia Saudí"}, {value: "dz", label: "Argelia"}, {value: "ar", label: "Argentina"}, {value: "am", label: "Armenia"}, {value: "aw", label: "Aruba"}, {value: "au", label: "Australia"}, {value: "at", label: "Austria"}, {value: "az", label: "Azerbaiyán"}, {value: "bs", label: "Bahamas"}, {value: "bh", label: "Bahréin"}, {value: "bd", label: "Bangladesh"}, {value: "bb", label: "Barbados"}, {value: "be", label: "Bélgica"}, {value: "bz", label: "Belice"}, {value: "bj", label: "Benín"}, {value: "bm", label: "Bermudas"}, {value: "by", label: "Bielorrusia"}, {value: "bo", label: "Bolivia"}, {value: "ba", label: "Bosnia-Herzegovina"}, {value: "bw", label: "Botsuana"}, {value: "br", label: "Brasil"}, {value: "bn", label: "Brunéi"}, {value: "bg", label: "Bulgaria"}, {value: "bf", label: "Burkina Faso"}, {value: "bi", label: "Burundi"}, {value: "bt", label: "Bután"}, {value: "cv", label: "Cabo Verde"}, {value: "kh", label: "Camboya"}, {value: "cm", label: "Camerún"}, {value: "ca", label: "Canadá"}, {value: "td", label: "Chad"}, {value: "cl", label: "Chile"}, {value: "cn", label: "China"}, {value: "cy", label: "Chipre"}, {value: "va", label: "Ciudad del Vaticano"}, {value: "co", label: "Colombia"}, {value: "km", label: "Comoras"}, {value: "cg", label: "Congo"}, {value: "kr", label: "Corea del Sur"}, {value: "ci", label: "Costa de Marfil"}, {value: "cr", label: "Costa Rica"}, {value: "hr", label: "Croacia"}, {value: "dk", label: "Dinamarca"}, {value: "dm", label: "Dominica"}, {value: "ec", label: "Ecuador"}, {value: "eg", label: "Egipto"}, {value: "sv", label: "El Salvador"}, {value: "ae", label: "Emiratos Árabes Unidos"}, {value: "er", label: "Eritrea"}, {value: "sk", label: "Eslovaquia"}, {value: "si", label: "Eslovenia"}, {value: "es", label: "España"}, {value: "us", label: "Estados Unidos"}, {value: "ee", label: "Estonia"}, {value: "et", label: "Etiopía"}, {value: "ph", label: "Filipinas"}, {value: "fi", label: "Finlandia"}, {value: "fj", label: "Fiyi"}, {value: "fr", label: "Francia"}, {value: "ga", label: "Gabón"}, {value: "gm", label: "Gambia"}, {value: "ge", label: "Georgia"}, {value: "gh", label: "Ghana"}, {value: "gi", label: "Gibraltar"}, {value: "gd", label: "Granada"}, {value: "gr", label: "Grecia"}, {value: "gl", label: "Groenlandia"}, {value: "gp", label: "Guadalupe"}, {value: "gu", label: "Guam"}, {value: "gt", label: "Guatemala"}, {value: "gf", label: "Guayana Francesa"}, {value: "gg", label: "Guernsey"}, {value: "gn", label: "Guinea"}, {value: "gq", label: "Guinea Ecuatorial"}, {value: "gw", label: "Guinea-Bissau"}, {value: "gy", label: "Guyana"}, {value: "ht", label: "Haití"}, {value: "hn", label: "Honduras"}, {value: "hu", label: "Hungría"}, {value: "in", label: "India"}, {value: "id", label: "Indonesia"}, {value: "iq", label: "Iraq"}, {value: "ie", label: "Irlanda"}, {value: "bv", label: "Isla Bouvet"}, {value: "cx", label: "Isla Christmas"}, {value: "im", label: "Isla de Man"}, {value: "nu", label: "Isla Niue"}, {value: "nf", label: "Isla Norfolk"}, {value: "is", label: "Islandia"}, {value: "ax", label: "Islas Åland"}, {value: "ky", label: "Islas Caimán"}, {value: "cc", label: "Islas Cocos"}, {value: "ck", label: "Islas Cook"}, {value: "fo", label: "Islas Feroe"}, {value: "gs", label: "Islas Georgia del Sur y Sandwich del Sur"}, {value: "hm", label: "Islas Heard y McDonald"}, {value: "fk", label: "Islas Malvinas"}, {value: "mp", label: "Islas Marianas del Norte"}, {value: "mh", label: "Islas Marshall"}, {value: "um", label: "Islas menores alejadas de los Estados Unidos"}, {value: "sb", label: "Islas Salomón"}, {value: "tc", label: "Islas Turcas y Caicos"}, {value: "vg", label: "Islas Vírgenes Británicas"}, {value: "vi", label: "Islas Vírgenes de los Estados Unidos"}, {value: "il", label: "Israel"}, {value: "it", label: "Italia"}, {value: "jm", label: "Jamaica"}, {value: "jp", label: "Japón"}, {value: "je", label: "Jersey"}, {value: "jo", label: "Jordania"}, {value: "kz", label: "Kazajistán"}, {value: "ke", label: "Kenia"}, {value: "kg", label: "Kirguistán"}, {value: "ki", label: "Kiribati"}, {value: "kw", label: "Kuwait"}, {value: "la", label: "Laos"}, {value: "ls", label: "Lesoto"}, {value: "lv", label: "Letonia"}, {value: "lb", label: "Líbano"}, {value: "lr", label: "Liberia"}, {value: "ly", label: "Libia"}, {value: "li", label: "Liechtenstein"}, {value: "lt", label: "Lituania"}, {value: "lu", label: "Luxemburgo"}, {value: "mk", label: "Macedonia"}, {value: "mg", label: "Madagascar"}, {value: "my", label: "Malasia"}, {value: "mw", label: "Malaui"}, {value: "mv", label: "Maldivas"}, {value: "ml", label: "Mali"}, {value: "mt", label: "Malta"}, {value: "ma", label: "Marruecos"}, {value: "mq", label: "Martinica"}, {value: "mu", label: "Mauricio"}, {value: "mr", label: "Mauritania"}, {value: "yt", label: "Mayotte"}, {value: "mx", label: "México"}, {value: "fm", label: "Micronesia"}, {value: "md", label: "Moldavia"}, {value: "mc", label: "Mónaco"}, {value: "mn", label: "Mongolia"}, {value: "me", label: "Montenegro"}, {value: "ms", label: "Montserrat"}, {value: "mz", label: "Mozambique"}, {value: "mm", label: "Myanmar"}, {value: "na", label: "Namibia"}, {value: "nr", label: "Nauru"}, {value: "np", label: "Nepal"}, {value: "ni", label: "Nicaragua"}, {value: "ne", label: "Níger"}, {value: "ng", label: "Nigeria"}, {value: "no", label: "Noruega"}, {value: "nc", label: "Nueva Caledonia"}, {value: "nz", label: "Nueva Zelanda"}, {value: "om", label: "Omán"}, {value: "nl", label: "Países Bajos"}, {value: "pk", label: "Pakistán"}, {value: "pw", label: "Palau"}, {value: "ps", label: "Palestina"}, {value: "pa", label: "Panamá"}, {value: "pg", label: "Papúa Nueva Guinea"}, {value: "py", label: "Paraguay"}, {value: "pe", label: "Perú"}, {value: "pn", label: "Pitcairn"}, {value: "pf", label: "Polinesia Francesa"}, {value: "pl", label: "Polonia"}, {value: "pt", label: "Portugal"}, {value: "pr", label: "Puerto Rico"}, {value: "qa", label: "Qatar"}, {value: "hk", label: "Región Administrativa Especial de Hong Kong de la República Popular China"}, {value: "mo", label: "Región Administrativa Especial de Macao de la República Popular China"}, {value: "gb", label: "Reino Unido"}, {value: "cf", label: "República Centroafricana"}, {value: "cz", label: "República Checa"}, {value: "cd", label: "República Democrática del Congo"}, {value: "do", label: "República Dominicana"}, {value: "re", label: "Reunión"}, {value: "rw", label: "Ruanda"}, {value: "ro", label: "Rumanía"}, {value: "ru", label: "Rusia"}, {value: "eh", label: "Sáhara Occidental"}, {value: "ws", label: "Samoa"}, {value: "as", label: "Samoa Americana"}, {value: "bl", label: "San Bartolomé"}, {value: "kn", label: "San Cristóbal y Nieves"}, {value: "sm", label: "San Marino"}, {value: "mf", label: "San Martín"}, {value: "pm", label: "San Pedro y Miquelón"}, {value: "vc", label: "San Vicente y las Granadinas"}, {value: "sh", label: "Santa Elena"}, {value: "lc", label: "Santa Lucía"}, {value: "st", label: "Santo Tomé y Príncipe"}, {value: "sn", label: "Senegal"}, {value: "rs", label: "Serbia"}, {value: "cs", label: "Serbia y Montenegro"}, {value: "sc", label: "Seychelles"}, {value: "sl", label: "Sierra Leona"}, {value: "sg", label: "Singapur"}, {value: "so", label: "Somalia"}, {value: "lk", label: "Sri Lanka"}, {value: "sz", label: "Suazilandia"}, {value: "za", label: "Sudáfrica"}, {value: "sd", label: "Sudán"}, {value: "se", label: "Suecia"}, {value: "ch", label: "Suiza"}, {value: "sr", label: "Surinam"}, {value: "sj", label: "Svalbard y Jan Mayen"}, {value: "th", label: "Tailandia"}, {value: "tw", label: "Taiwán"}, {value: "tz", label: "Tanzania"}, {value: "tj", label: "Tayikistán"}, {value: "io", label: "Territorio Británico del Océano Índico"}, {value: "tf", label: "Territorios Australes Franceses"}, {value: "tl", label: "Timor Oriental"}, {value: "tg", label: "Togo"}, {value: "tk", label: "Tokelau"}, {value: "to", label: "Tonga"}, {value: "tt", label: "Trinidad y Tobago"}, {value: "tn", label: "Túnez"}, {value: "tm", label: "Turkmenistán"}, {value: "tr", label: "Turquía"}, {value: "tv", label: "Tuvalu"}, {value: "ua", label: "Ucrania"}, {value: "ug", label: "Uganda"}, {value: "uy", label: "Uruguay"}, {value: "uz", label: "Uzbekistán"}, {value: "vu", label: "Vanuatu"}, {value: "ve", label: "Venezuela"}, {value: "vn", label: "Vietnam"}, {value: "wf", label: "Wallis y Futuna"}, {value: "ye", label: "Yemen"}, {value: "dj", label: "Yibuti"}, {value: "zm", label: "Zambia"}, {value: "zw", label: "Zimbabue"}
  ];

  get idType() {
    return this.userForm.get('idType');
  }

  get id() {
    return this.userForm.get('id');
  }

  get idCountry() {
    return this.userForm.get('idCountry');
  }

  get residentCountry() {
    return this.userForm.get('residentCountry');
  }

  get expireDateError() {
    let isValidDate = Utils.isValidDate(this.userForm.get('idExpirationDay').value, this.userForm.get('idExpirationMonth').value, this.userForm.get('idExpirationYear').value)
    return this.userForm.get('idExpirationYear').touched && !isValidDate;
  }

  get expireBeforelastFlight() {
    const formModel = this.userForm.value;
    let flightDate = moment(this.lastFlight.departure_datetime, 'YYYY-MM-DD');
    let expireDate = moment(formModel.idExpirationYear + '-' + formModel.idExpirationMonth + '-' + formModel.idExpirationDay, 'YYYY-MM-DD');
    if (!expireDate.isAfter(flightDate)) {
      this.userForm.controls['idExpirationYear'].setErrors({ expireBefore: true});
      return true;
    }
    return false;
  }

  get issueDateError() {
    let isValidDate = Utils.isValidDate(this.userForm.get('idIssueDay').value, this.userForm.get('idIssueMonth').value, this.userForm.get('idIssueYear').value)
    return this.userForm.get('idIssueYear').touched && !isValidDate;
  }

  get arrivalAddress() {
    return this.userForm.get('arrivalAddress');
  }

  get arrivalZip() {
    return this.userForm.get('arrivalZip');
  }

  constructor(private formBuilder: FormBuilder, private configService: AppConfigService) {
    this.ID_TYPES = [
      {
        value: "id",
        label: $localize`:@@checkin_form_nationaldocument:Documento Nacional de Identidad`
      },
      {
        value: "pas",
        label: $localize`:@@checkin_form_passport:Pasaporte`
      }
    ];
    this.NATIONALITIES = configService.nationalities;
    this.buildForm();
  }

  ngOnInit(): void {
    this.lastFlight = {...this.flights[this.flights.length - 1]};
    this.firstFlight = {...this.flights[0]};
    this.resetForm();
    this.validateRequirements();
  }


  private validateRequirements() {
    let docuRequirement = this.requirements['document_types'][this.passenger.idType == 'id' ? 'national_id' : 'passport']['requirements'];
    if (!this.passenger.allowedNationalId) this.userForm.get('idType').disable();
    this.isIssueDateNeed =  docuRequirement && docuRequirement.includes("issue_date");
    this.isExpireDateNeed = docuRequirement && docuRequirement.includes("expire_date");
    this.isCountryNeed = docuRequirement && docuRequirement.includes("country");
    if (!this.isExpireDateNeed) {
      this.userForm.get('idExpirationDay').disable();
      this.userForm.get('idExpirationMonth').disable();
      this.userForm.get('idExpirationYear').disable();
    }
    if (!this.isIssueDateNeed) {
      this.userForm.get('idIssueDay').disable();
      this.userForm.get('idIssueMonth').disable();
      this.userForm.get('idIssueYear').disable();
    }
    if (!this.isCountryNeed) this.userForm.get('idCountry').disable();
    if (!this.requirements['arrival_address']) this.userForm.get('arrivalAddress').disable();
    if (!this.requirements['arrival_zip']) this.userForm.get('arrivalZip').disable();
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      idType: ['', Validators.required],
      id: ['', [Validators.required]],
      idCountry: ['', Validators.required],
      idExpirationDay: ['', [Validators.required]],
      idExpirationMonth: ['', [Validators.required]],
      idExpirationYear: ['', [Validators.required]],
      idIssueDay: ['', [Validators.required]],
      idIssueMonth: ['', [Validators.required]],
      idIssueYear: ['', [Validators.required]],
      residentCountry: ['',],
      arrivalAddress: ['', [Validators.required]],
      arrivalZip: ['', [Validators.required]],
    });
  }

  public resetForm() {
    this.userForm.reset({
      idType: this.passenger.idType || 'pas',
      id: this.passenger.id || '',
      idCountry: 'es',
      idExpirationDay: '',
      idExpirationMonth: '',
      idExpirationYear: '',
      idIssueDay: '',
      idIssueMonth: '',
      idIssueYear: '',
      residentCountry: this.passenger.nationality_iso || 'es',
      arrivalAddress: '',
      arrivalZip: ''
    });
    this.idTypeLabel = this.passenger.idType == 'id' ? 'documento nacional de identidad' : 'Pasaporte';
  }

  onChangeIdType(type) {
    this.passenger.idType = type;
    this.resetForm();
    this.validateRequirements();
  }

  public save() {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.fillPassengerRequirements();
    }
    return this.userForm.valid ? true : false;
  }

  fillPassengerRequirements() {
    const formModel = this.userForm.value;
    this.passenger['travel_document'] = {
      type: this.passenger.allowedNationalId && formModel.idType == 'id' ? 'national_id' : 'passport',
      number: formModel.id,
      expires: this.isExpireDateNeed && moment(formModel.idExpirationDay + '-' + formModel.idExpirationMonth + '-' + formModel.idExpirationYear, 'DD-MM-YYYY').format('YYYY-MM-DD')  || null,
      issued: this.isIssueDateNeed && moment(formModel.idIssueDay + '-' + formModel.idIssueMonth + '-' + formModel.idIssueYear, 'DD-MM-YYYY').format('YYYY-MM-DD') || null,
      country: this.isCountryNeed && formModel.idCountry || null
    }
    this.passenger['api'] = {
      resident_country: this.requirements['resident_country'] && formModel.residentCountry || null,
      contact_person: this.requirements['contact_person'] && 'Airhopping' || null,
      contact_phone: this.requirements['contact_phone'] && '+34696664532' || null,
      contact_relation: this.requirements['contact_relation'] && 'Client' || null,
      arrival_state: this.requirements['arrival_state'] && this.firstFlight['arrival_country_code'] || null,
      arrival_city: this.requirements['arrival_city'] && this.firstFlight['arrival_city_code'] || null,
      arrival_address: this.requirements['arrival_address'] && formModel.arrivalAddress || null,
      arrival_zip: this.requirements['arrival_zip'] && formModel.arrivalZip || null
    }
  }

}
