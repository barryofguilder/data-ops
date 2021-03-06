import Ember from 'ember';
import MAPPING_TYPE from 'data-ops/utils/mapping-type-constants';

const CONFIGURED_CODESETS = [
  'AdministrativeSex',
  'Language',
  'MaritalStatus',
  'Race'
];

export default Ember.Component.extend({
  tagName: 'tr',

  error: Ember.inject.service(),

  model: null,
  onEdit: null,

  showCodesetWarning: Ember.computed('model.mappingType', 'model.codeset', function() {
    if (this.get('model.mappingType') === MAPPING_TYPE.CODESET) {
      return !CONFIGURED_CODESETS.includes(this.get('model.codeset'));
    }
  }),

  showErrors: Ember.computed('error.showErrors', 'model.name', function() {
    return this.get('error.showErrors') && this.get('model.name') === 'DateOfBirth';
  }),

  modelChanged: Ember.observer('model.mappingType', 'model.codeset', function() {
    Ember.run.later(this, '_initializeTooltips');
  }),

  didInsertElement() {
    this._super(...arguments);

    this._initializeTooltips();
  },

  _initializeTooltips() {
    this.$('[data-toggle="tooltip"]').tooltip();
  }
});
