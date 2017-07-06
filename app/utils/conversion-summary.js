export default function(conversionFunction, rawField) {
  if (conversionFunction && rawField) {
    return conversionFunction.replace('<input>', rawField);
  }

  return '';
}
