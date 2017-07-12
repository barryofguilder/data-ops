import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';
import MAPPING_TYPE from 'data-ops/utils/qualisys-mapping-constants';

export default Ember.Component.extend({
  model: null,
  existingMappings: null,
  close: null,

  qualisysMapping: stateFor('qualisys-mapping', 'model'),
  mappingTypes: Ember.computed('existingMappings.[]', function() {
    let mappings = [
      MAPPING_TYPE.H_ADMIT_AGE,
      MAPPING_TYPE.H_CAT_AGE,
      MAPPING_TYPE.H_SERVICE_DES
    ];
    let existingMappings = this.get('existingMappings');

    return mappings.filter((mapping) => {
      let exists = false;

      existingMappings.forEach((existing) => {
        if (existing.get('mappingType') === mapping) {
          exists = true;
          return;
        }
      });

      return !exists;
    });
  }),
  showMappingValue: Ember.computed('qualisysMapping.mappingType', function() {
    return this.get('qualisysMapping.mappingType') === MAPPING_TYPE.H_SERVICE_DES;
  }),
  mappingValues: [
    '1',
    '3',
    '5',
    '7'
  ],

  init() {
    this._super(...arguments);

    let mappingProperties = this.get('model').getProperties('mappingType', 'value');
    this.get('qualisysMapping').setProperties(mappingProperties);
  },

  actions: {
    save() {
      let model = this.get('model');

      model.setProperties(this.get('qualisysMapping'));
      model.save();

      this.get('close')();
    }
  }
});
