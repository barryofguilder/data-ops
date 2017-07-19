import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

const MAPPING_COMBINE = 'Combine RAW fields';
const MAPPING_LITERAL = 'Literal Value';

export default Ember.Component.extend({
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

  init() {
    this._super(...arguments);

    let businessKey = this.get('businessKey');
    businessKey.setProperties('rawFields', 'literalValue');

    if (Ember.isPresent(businessKey.get('literalValue'))) {
      this.set('selectedMappingType', MAPPING_LITERAL);
    } else {
      this.set('selectedMappingType', MAPPING_COMBINE);
    }
  },

  actions: {
    save() {
      let mappingType = this.get('selectedMappingType');
      let businessKey = this.get('businessKey');

      if (mappingType === MAPPING_COMBINE) {
        businessKey.set('literalValue', null);
      } else if (mappingType === MAPPING_LITERAL) {
        businessKey.set('rawFields', Ember.A());
      }

      this.get('model').setProperties(businessKey);
      this.get('close')();
    }
  }
});
