import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

const MAPPING_COMBINE = 'Combine Payload Headers';
const MAPPING_LITERAL = 'Literal Value';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  model: null,
  close: null,

  businessKey: stateFor('business-key', 'model'),

  mappingTypes: [
    MAPPING_COMBINE,
    MAPPING_LITERAL
  ],
  selectedMappingType: null,

  showRawFields: Ember.computed.equal('selectedMappingType', MAPPING_COMBINE),
  showLiteralField: Ember.computed.equal('selectedMappingType', MAPPING_LITERAL),

  rawFields: null,
  rawFieldSort: ['name'],
  sortedRawFields: Ember.computed.sort('rawFields', 'rawFieldSort'),
  addingInputField: false,

  init() {
    this._super(...arguments);

    let keyProperties = this.get('model').getProperties('literalValue');
    let businessKey = this.get('businessKey');
    businessKey.setProperties(keyProperties);

    if (Ember.isPresent(businessKey.get('literalValue'))) {
      this.set('selectedMappingType', MAPPING_LITERAL);
    } else {
      this.set('selectedMappingType', MAPPING_COMBINE);
    }

    if (this.get('model.rawFields.length') === 0) {
      this.set('addingInputField', true);
    }

    let rawFields = this.get('store').peekAll('raw-field')
    let channelId = this.get('model.channel.id');
    this.set('rawFields', rawFields.filterBy('channel.id', channelId));
  },

  actions: {
    save() {
      let mappingType = this.get('selectedMappingType');
      let businessKey = this.get('businessKey');

      if (mappingType === MAPPING_COMBINE) {
        businessKey.set('literalValue', null);
      } else if (mappingType === MAPPING_LITERAL) {
        this.set('model.rawFields', Ember.A());
      }

      this.get('model').setProperties(this.get('businessKey'));
      this.get('close')();
    },

    selectedMappingType(mappingType) {
      this.set('selectedMappingType', mappingType);

      if (mappingType === MAPPING_COMBINE && this.get('model.rawFields.length') === 0) {
        this.set('addingInputField', true);
      }
    },

    rawFieldSelected(inputField, selectedId) {
      let rawFields = this.get('model.rawFields');
      let index = rawFields.indexOf(inputField);

      rawFields.removeObject(inputField);

      let newInputField = this.get('rawFields').findBy('id', selectedId);

      rawFields.insertAt(index, newInputField);
    },

    newInputFieldSelected(selectedId) {
      if (selectedId) {
        this.set('addingInputField', false);

        let newInputField = this.get('rawFields').findBy('id', selectedId);
        this.get('model.rawFields').pushObject(newInputField);
      }
    },

    removeInputField(inputField) {
      this.get('model.rawFields').removeObject(inputField);
    }
  }
});
