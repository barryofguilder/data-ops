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
  store: Ember.inject.service(),

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
    name: 'Function'
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
  conversionFunctions: null,
  conversionFunctionSort: ['name'],
  sortedConversionFunctions: Ember.computed.sort('conversionFunctions', 'conversionFunctionSort'),
  paramFields: null,
  selectedParamFields: Ember.computed('fieldMapping.conversionFunctionParams.[]', function() {
    return this.get('fieldMapping.conversionFunctionParams');
  }),
  promptForReset: false,
  isCodesetConfigured: true,

  showCodesetField: Ember.computed('fieldMapping.mappingType', function() {
    let mappingType = this.get('fieldMapping.mappingType');
    return mappingType === MAPPING_TYPE.CODESET;
  }),

  showConversionFunction: Ember.computed('fieldMapping.mappingType', function() {
    return this.get('fieldMapping.mappingType') === MAPPING_TYPE.FUNCTION;
  }),

  showConversionFunctionParams: Ember.computed('fieldMapping.conversionFunction.multipleParams', function() {
    return this.get('fieldMapping.conversionFunction.multipleParams');
  }),

  showCustomMapping: Ember.computed('fieldMapping.mappingType', function() {
    return this.get('fieldMapping.mappingType') === MAPPING_TYPE.CUSTOM;
  }),

  init() {
    this._super(...arguments);

    let mappingProperties = this.get('model').getProperties(
      'mappingType',
      'codeset',
      'conversionFunction',
      'conversionFunctionParams',
      'customMapping'
    );
    let fieldMapping = this.get('fieldMapping');
    fieldMapping.setProperties(mappingProperties);

    if (Ember.isEmpty(fieldMapping.get('conversionFunctionParams'))) {
      fieldMapping.set('conversionFunctionParams', Ember.A());
    }

    this.get('store').findAll('conversion-function').then((conversionFunctions) => {
      this.set('conversionFunctions', conversionFunctions);
    });

    let paramFields = this.get('store').peekAll('field-mapping');
    paramFields = paramFields.map((mapping) => mapping.get('name'));
    this.set('paramFields', paramFields);
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

      if (Ember.isEmpty(codeset)) {
        this.set('isCodesetConfigured', true);
        return;
      }

      let isConfigured = CONFIGURED_CODESETS.includes(codeset);
      this.set('isCodesetConfigured', isConfigured);
    },

    conversionFunctionSelected(conversionFunctionId) {
      let originalSelection = this.get('fieldMapping.conversionFunction.id');

      if (originalSelection !== conversionFunctionId) {
        this.set('fieldMapping.conversionFunctionParams', Ember.A());
      }

      if (Ember.isEmpty(conversionFunctionId)) {
        this.set('fieldMapping.conversionFunction', null);
        this.set('fieldMapping.conversionFunctionParams', Ember.A());
        return;
      }

      let conversionFunction = this.get('store').peekRecord('conversion-function', conversionFunctionId);
      this.set('fieldMapping.conversionFunction', conversionFunction);

      this.get('fieldMapping.conversionFunctionParams').pushObject('');
    },

    addConversionFunctionParam() {
      this.get('fieldMapping.conversionFunctionParams').pushObject('');
    },

    conversionFunctionParamSelected(conversionFunctionParam) {
      if (Ember.isEmpty(conversionFunctionParam)) {
        return;
      }

      let functionParams = this.get('fieldMapping.conversionFunctionParams');

      // Remove the original param used only to initally show the dropdown.
      functionParams.removeObject('');

      functionParams.pushObject(conversionFunctionParam);
    },

    conversionFunctionParamRemoved(conversionFunctionParam) {
      let functionParams = this.get('fieldMapping.conversionFunctionParams');

      functionParams.removeObject(conversionFunctionParam);

      if (functionParams.get('length') === 0) {
        functionParams.pushObject('');
      }
    }
  }
});
