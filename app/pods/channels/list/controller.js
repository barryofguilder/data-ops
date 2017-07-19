import Ember from 'ember';
import CHANNEL_STATE from 'data-ops/utils/channel-constants';

export default Ember.Controller.extend({
  channelSorting: ['name'],
  sortedChannels: Ember.computed.sort('model', 'channelSorting'),
  filteredChannels: Ember.computed('sortedChannels.@each.state', 'selectedState', function() {
    let channels = this.get('sortedChannels');
    let selectedState = this.get('selectedState');

    if (Ember.isEmpty(selectedState)) {
      return channels;
    }

    return channels.filterBy('state', selectedState);
  }),

  selectedState: null,
  channelStates: [
    CHANNEL_STATE.LIVE,
    CHANNEL_STATE.INACTIVE,
    CHANNEL_STATE.TEST,
    CHANNEL_STATE.IN_IMPLEMENTATION
  ]
});
