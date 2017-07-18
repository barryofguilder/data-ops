import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  channel: null,
  rawFields: null,
  rawFieldSort: ['name'],
  sortedRawFields: Ember.computed.sort('rawFields', 'rawFieldSort'),

  init() {
    this._super(...arguments);

    this.get('store').query('raw-field', { channelId: this.get('channel.id') }).then((rawFields) => {
      this.set('rawFields', rawFields);
    });
  }
});
