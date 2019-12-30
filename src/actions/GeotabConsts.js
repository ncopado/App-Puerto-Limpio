export const host = "geotab.com";
export const farm = "my399";

export class GeoTabRequestBodyEncapsulator {
  constructor(method, params) {
    this.method = method;
    this.params = params;
  }
}
