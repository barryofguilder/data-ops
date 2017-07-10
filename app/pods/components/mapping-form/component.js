import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';

const PATIENT_INPUT_FIELDS = [
  'Addr1',
  'Addr2',
  'City',
  'DOB',
  'Email',
  'MRN',
  'Sex',
  'ST',
  'Zip'
];
const ENCOUNTER_INPUT_FIELDS = [
  'AdmitDate',
  'AdmitSource',
  'FacilityId'
];

export default Ember.Component.extend({
  model: null,
  close: null,

  fieldMapping: stateFor('field-mapping', 'model'),
  fieldType: Ember.computed('model.fieldType', function() {
    if (this.get('model.fieldType') === FIELD_TYPE.ENCOUNTER) {
      return 'Encounter';
    }

    return 'Patient';
  }),
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
  rawInputFields: Ember.computed('model.fieldType', function() {
    if (this.get('model.fieldType') === FIELD_TYPE.ENCOUNTER) {
      return ENCOUNTER_INPUT_FIELDS;
    }

    return PATIENT_INPUT_FIELDS;
  }),
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
