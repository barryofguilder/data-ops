import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';
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
  rawInputFields: Ember.computed('model.fieldType', function() {
    if (this.get('model.fieldType') === FIELD_TYPE.ENCOUNTER) {
      return ENCOUNTER_INPUT_FIELDS;
    }

    return PATIENT_INPUT_FIELDS;
  }),
  promptForReset: false,

  init() {
    this._super(...arguments);

    let mappingProperties = this.get('model').getProperties('mappingType', 'rawField', 'codeset', 'conversionFunction', 'customMapping');
    this.get('fieldMapping').setProperties(mappingProperties);
  },

  actions: {
    save() {
      this.get('model').setProperties(this.get('fieldMapping'));
      this.get('close')();
    },

    reset() {
      this.get('fieldMapping').setProperties({
        rawField: null
      });
      this.get('model').setProperties(this.get('fieldMapping'));
      this.get('close')();
    }
  }
});
