import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('channel', params.channelId, {
      include: 'businessKeys.rawFields,fields.rawField,fields.conversionFunction'
    });
  }
});
