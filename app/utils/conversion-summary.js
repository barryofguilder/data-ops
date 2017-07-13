export default function(conversionFunction, fieldName) {
  if (conversionFunction && fieldName) {
    return conversionFunction.replace('<input>', fieldName);
  }

  return '';
}
