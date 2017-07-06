import Ember from 'ember';

export default Ember.Controller.extend({
  channelSorting: ['name'],
  sortedChannels: Ember.computed.sort('model', 'channelSorting')
});
