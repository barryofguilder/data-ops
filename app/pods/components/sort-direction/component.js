import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  direction: null,

  ascending: Ember.computed.equal('direction', 'asc'),
  descending: Ember.computed.equal('direction', 'desc')
});
