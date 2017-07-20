import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  error: Ember.inject.service(),

  model: null,
  onEdit: null,

  showErrors: Ember.computed('error.showErrors', 'model.name', function() {
    return this.get('error.showErrors') && this.get('model.name') === 'Patient';
  })
});
