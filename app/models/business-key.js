import DS from 'ember-data';
import Ember from 'ember';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import ConversionSummary from 'data-ops/utils/conversion-summary';

export default DS.Model.extend({
  name: DS.attr('string'),
  keyType: DS.attr('string'),
  mappingType: DS.attr('string'),
  rawField: DS.belongsTo('raw-field'),
  conversionFunction: DS.belongsTo('conversion-function'),
  conversionFunctionParams: DS.attr(),
  customMapping: DS.attr('string'),
  channel: DS.belongsTo('channel'),

  mappingDisplay: Ember.computed('mappingType', 'rawField.name', 'conversionFunction', 'conversionFunctionParams.[]', 'customMapping', function() {
    let mappingType = this.get('mappingType');

    if (mappingType === MAPPING_TYPE.CUSTOM) {
      return `Custom: ${this.get('customMapping')}`;
    } else if (mappingType === MAPPING_TYPE.PASSTHROUGH) {
      return `Passthrough: ${this.get('rawField.name')}`;
    } else if (mappingType === MAPPING_TYPE.FUNCTION) {
      let display = conversionFunctionDisplay(this.get('conversionFunction'), this.get('name'), this.get('conversionFunctionParams'));
      return `Custom: ${display}`;
    }

    return '';
  })
});

function conversionFunctionDisplay(conversionFunction, fieldName, fieldParams) {
  return ConversionSummary(conversionFunction, fieldName, fieldParams);
}
