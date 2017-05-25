export function syncWithAddressComponent(addressData?: any, params?: any, item?: any, form?: any): any {
  const targetComponent: any = params[0];

  addressData = {...addressData};
  let componentValue: string = '';

  if (typeof addressData === 'object' && 'address_components' in addressData) {
    const component = addressData.address_components
      .find((component) => {
        return component.types.indexOf(targetComponent) !== -1;
      });

    console.log('targetComponent', targetComponent, component);

    if(component) {
      if(targetComponent == 'country') {
        componentValue = ('short_name' in component)?component.short_name:'';
      }
      else {
        componentValue = ('long_name' in component)?component.long_name:'';
      }
    }
  }
  return componentValue;
}
