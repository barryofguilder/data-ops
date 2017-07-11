import DS from 'ember-data';
import Ember from 'ember';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import ConversionSummary from 'data-ops/utils/conversion-summary';

export default DS.Model.extend({
  fieldType: DS.attr('string'),
  name: DS.attr('string'),
  mappingType: DS.attr('string'),
  rawField: DS.attr('string'),
  codeset: DS.attr('string'),
  conversionFunction: DS.attr('string'),
  customMapping: DS.attr('string'),

  channel: DS.belongsTo('channel'),

  rawInputMapping: Ember.computed('mappingType', 'customMapping', 'rawField', 'codeset', 'conversionFunction', function() {
    let mappingType = this.get('mappingType');

    if (mappingType === MAPPING_TYPE.CUSTOM) {
      return `Custom: ${this.get('customMapping')}`;
    } else if (mappingType === MAPPING_TYPE.PASSTHROUGH) {
      return `Passthrough: ${this.get('rawField')}`;
    } else if (mappingType === MAPPING_TYPE.FUNCTION) {
      let display = conversionFunctionDisplay(this.get('conversionFunction'), this.get('rawField'));
      return `Custom: ${display}`;
    } else if (mappingType === MAPPING_TYPE.CODESET) {
      return `Codeset: ${this.get('codeset')}`;
    } else if (mappingType === MAPPING_TYPE.NOT_MAPPED) {
      return 'Not Mapped';
    }

    return '';
  })
});

function conversionFunctionDisplay(conversionFunction, rawField) {
  return ConversionSummary(conversionFunction, rawField);
}
