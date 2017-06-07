
export class SepaService {

  constructor() { }

  getCountryFromIban(iban:string):string {

    iban = iban || '';
    let country = '';

    //get char from pos 0 to 2 or less
    if (iban.length >= 2) {
      country = iban[0] + iban[1];
    } else {
      country = (iban) ? iban.substring(0, iban.length) : '';
    }

    country = country.toUpperCase();

    return country;
  }

  getIbanMask(countryCode) {

    const a = /[A-Z]/i;
    const d = /\d/;

    const IBAN_MASKS = {
      'default': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'AD': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'AL': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'AT': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'BA': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'BE': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'BG': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'CH': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d],
      'CY': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'CZ': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'DE': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'DK': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'EE': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'ES': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'FI': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'FO': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'FR': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'GB': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'GE': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'GG': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'GI': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'GL': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'GR': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'HR': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d],
      'HU': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'IE': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'IS': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'IT': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'LI': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d],
      'LT': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'LU': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'LV': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d],
      'MC': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'MD': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'ME': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'MK': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'MT': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'NL': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'NO': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'PL': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'PT': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d],
      'RO': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'RS': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d],
      'SE': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'SI': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'SK': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d],
      'SM': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d],
      'UA': [a,a,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d,d,d,d,' ',d]
    };

    return IBAN_MASKS[countryCode] || IBAN_MASKS['default'];

  }


}
