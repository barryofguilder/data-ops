import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group', 'row'],

  store: Ember.inject.service(),

  fieldId: null,
  selectedParam: null,
  existingFields: null,
  onSelect: null,
  onRemove: null,

  paramFields: null,
  sortedParamFields: Ember.computed.sort('paramFields', function(a, b) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }

    return 0;
  }),
  deleteDisabled: Ember.computed('existingFields.[]', function() {
    let existingFields = this.get('existingFields');

    return existingFields.any((field) => {
      return field === '';
    });
  }),

  init() {
    this._super(...arguments);

    this.set('fieldId', `function-field-${Math.random().toString(36).substr(2, 9)}`);
  },

  actions: {
    paramSelected(functionParam) {
      let oldParam = this.get('selectedParam');

      if (oldParam) {
        this.get('onRemove')(oldParam);
      }

      this.set('selectedParam', functionParam);
      this.get('onSelect')(functionParam);
    }
  }
});
