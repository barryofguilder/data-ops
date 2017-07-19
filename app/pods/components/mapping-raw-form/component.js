import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';
import FIELD_TYPE from 'data-ops/utils/field-type-constants';

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
  promptForReset: false,
  rawFields: null,
  rawFieldSort: ['name'],
  sortedRawFields: Ember.computed.sort('rawFields', 'rawFieldSort'),

  init() {
    this._super(...arguments);

    let mappingProperties = this.get('model').getProperties('mappingType', 'rawField', 'codeset', 'conversionFunction', 'customMapping');
    this.get('fieldMapping').setProperties(mappingProperties);

    let rawFields = this.get('store').peekAll('raw-field');
    this.set('rawFields', rawFields);
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
    },

    rawFieldSelected(rawFieldId) {
      if (Ember.isEmpty(rawFieldId)) {
        this.set('fieldMapping.rawField', null);
        return;
      }

      let rawField = this.get('rawFields').findBy('id', rawFieldId);
      this.set('fieldMapping.rawField', rawField);
    }
  }
});
