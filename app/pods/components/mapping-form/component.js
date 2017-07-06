import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';

export default Ember.Component.extend({
  model: null,
  close: null,

  fieldMapping: stateFor('field-mapping', 'model'),
  mappingTypes: [{
    id: MAPPING_TYPE.NOT_MAPPED,
    name: 'Not Mapped'
  }, {
    id: MAPPING_TYPE.PASSTHROUGH,
    name: 'Passthrough'
  }, {
    id: MAPPING_TYPE.FUNCTION,
    name: 'Canned Function'
  }, {
    id: MAPPING_TYPE.CUSTOM,
    name: 'Custom'
  }],
  rawInputFields: [
    'Addr1',
    'Addr2',
    'AdmitDate',
    'AdmitSource',
    'City',
    'DOB',
    'Email',
    'FacilityId',
    'MRN',
    'Sex',
    'ST',
    'Zip'
  ],
  conversionFunctions: [
    'date_YYYYMMDDhhmm(<input>)',
    'date_YYYYMMDDhhmmss(<input>)'
  ],

  showRawInputField: Ember.computed('fieldMapping.mappingType', function() {
    let mappingType = this.get('fieldMapping.mappingType');
    return mappingType === MAPPING_TYPE.PASSTHROUGH || mappingType === MAPPING_TYPE.FUNCTION;
  }),

  showConversionFunction: Ember.computed('fieldMapping.mappingType', function() {
    return this.get('fieldMapping.mappingType') === MAPPING_TYPE.FUNCTION;
  }),

  showCustomMapping: Ember.computed('fieldMapping.mappingType', function() {
    return this.get('fieldMapping.mappingType') === MAPPING_TYPE.CUSTOM;
  }),

  init() {
    this._super(...arguments);

    let mappingProperties = this.get('model').getProperties('mappingType', 'rawField', 'conversionFunction', 'customMapping');
    this.get('fieldMapping').setProperties(mappingProperties);
  },

  actions: {
    save() {
      this.get('model').setProperties(this.get('fieldMapping'));
      this.get('close')();
    }
  }
});
