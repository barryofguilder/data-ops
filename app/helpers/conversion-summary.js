import Ember from 'ember';
import ConversionSummary from 'data-ops/utils/conversion-summary';

export function conversionSummary(params, hash) {
  let customFunction = params[0];
  return ConversionSummary(customFunction, hash.rawField);
}

export default Ember.Helper.helper(conversionSummary);
