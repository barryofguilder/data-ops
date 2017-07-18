import DS from 'ember-data';
import Ember from 'ember';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import ConversionSummary from 'data-ops/utils/conversion-summary';

export default DS.Model.extend({
  fieldType: DS.attr('string'),
  name: DS.attr('string'),
  rawField: DS.belongsTo('raw-field'),
  mappingType: DS.attr('string'),
  codeset: DS.attr('string'),
  conversionFunction: DS.belongsTo('conversion-function'),
  conversionFunctionParams: DS.attr(),
  customMapping: DS.attr('string'),

  channel: DS.belongsTo('channel'),

  rawInputMapping: Ember.computed('name', 'mappingType', 'customMapping', 'codeset', 'conversionFunction', 'conversionFunctionParams.[]', function() {
    let mappingType = this.get('mappingType');

    if (mappingType === MAPPING_TYPE.CUSTOM) {
      return `Custom: ${this.get('customMapping')}`;
    } else if (mappingType === MAPPING_TYPE.PASSTHROUGH) {
      return `Passthrough: ${this.get('name')}`;
    } else if (mappingType === MAPPING_TYPE.FUNCTION) {
      let display = conversionFunctionDisplay(this.get('conversionFunction'), this.get('name'), this.get('conversionFunctionParams'));
      return `Custom: ${display}`;
    } else if (mappingType === MAPPING_TYPE.CODESET) {
      return `Codeset: ${this.get('codeset')}`;
    } else if (mappingType === MAPPING_TYPE.NOT_MAPPED) {
      return 'Not Mapped';
    }

    return '';
  })
});

function conversionFunctionDisplay(conversionFunction, fieldName, fieldParams) {
  return ConversionSummary(conversionFunction, fieldName, fieldParams);
}
