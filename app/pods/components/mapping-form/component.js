import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';

const CODESETS = [
  'AdministrativeSex',
  'AdmissionType',
  'AdmitSource',
  'DischargeDisposition',
  'DischargeStatus',
  'EthnicGroup',
  'Language',
  'MaritalStatus',
  'NPACode',
  'PatientClass',
  'Province',
  'Race',
  'TelecommunicationUseCode'
];
const CONFIGURED_CODESETS = [
  'AdministrativeSex',
  'Language',
  'MaritalStatus',
  'Race'
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
    id: MAPPING_TYPE.CODESET,
    name: 'Codeset'
  }, {
    id: MAPPING_TYPE.FUNCTION,
    name: 'Canned Function'
  }, {
    id: MAPPING_TYPE.CUSTOM,
    name: 'Custom'
  }],
  codesets: Ember.computed('model.fieldType', function() {
    if (this.get('model.fieldType') === FIELD_TYPE.ENCOUNTER) {
      return CODESETS;
    }

    return CODESETS;
  }),
  conversionFunctions: [
    'date_YYYYMMDDhhmm(<input>)',
    'date_YYYYMMDDhhmmss(<input>)'
  ],
  promptForReset: false,
  isCodesetConfigured: true,

  showCodesetField: Ember.computed('fieldMapping.mappingType', function() {
    let mappingType = this.get('fieldMapping.mappingType');
    return mappingType === MAPPING_TYPE.CODESET;
  }),

  showConversionFunction: Ember.computed('fieldMapping.mappingType', function() {
    return this.get('fieldMapping.mappingType') === MAPPING_TYPE.FUNCTION;
  }),

  showCustomMapping: Ember.computed('fieldMapping.mappingType', function() {
    return this.get('fieldMapping.mappingType') === MAPPING_TYPE.CUSTOM;
  }),

  init() {
    this._super(...arguments);

    let mappingProperties = this.get('model').getProperties('mappingType', 'codeset', 'conversionFunction', 'customMapping');
    this.get('fieldMapping').setProperties(mappingProperties);
  },

  actions: {
    save() {
      this.get('model').setProperties(this.get('fieldMapping'));
      this.get('close')();
    },

    reset() {
      this.get('fieldMapping').setProperties({
        mappingType: null,
        codeset: null,
        conversionFunction: null,
        customMapping: null
      });
      this.get('model').setProperties(this.get('fieldMapping'));
      this.get('close')();
    },

    codesetSelected(codeset) {
      this.set('fieldMapping.codeset', codeset);

      let isConfigured = CONFIGURED_CODESETS.includes(codeset);
      this.set('isCodesetConfigured', isConfigured);
    }
  }
});
