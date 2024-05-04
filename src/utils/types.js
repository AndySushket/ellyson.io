export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isNumeric(value) {
  return (
    !isNaN(parseFloat(value)) &&
    isFinite(value)
  );
}

export function isBoolean(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]';
}

export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export function isUndefined(value) {
  return value === undefined;
}
