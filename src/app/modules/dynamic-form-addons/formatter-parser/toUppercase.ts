export function toUppercase(value: string): string {

  if (typeof value === "string") {
    value = value.toLowerCase().replace(/[a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]/g, function (str) {
      return str.toUpperCase();
    });
  }
  else {
    value = "";
  }

  return value;

}

