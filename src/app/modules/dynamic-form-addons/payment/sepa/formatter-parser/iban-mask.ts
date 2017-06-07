import { SepaService } from './sepa.service';
import { FormatterParser } from '../../../../formatter-parser/formatterParser';
import { IFormatterParserFn } from '../../../../formatter-parser/struct/formatter-parser-function';

export function ibanMask(value: any) {
  // Manually inject service
  //let injector = Injector.resolveAndCreate([SERVICE_PROVIDER]);
  //let service= injector.get(Service);

  const sepaService = new SepaService();
  const countryCode = sepaService.getCountryFromIban(value);
  return sepaService.getIbanMask(countryCode);
}


