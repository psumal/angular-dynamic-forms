type googleAddressSearchComponents = "street_number" | "street" | "postal_code" | "locality" | "country";

export interface IAddressComponentMap {
  component:googleAddressSearchComponents,
  control:string
}
