import { Factory } from 'ember-cli-mirage';
import CHANNEL_STATE from 'data-ops/utils/channel-constants';

const STATES = [
  CHANNEL_STATE.ACTIVE,
  CHANNEL_STATE.ACTIVE,
  CHANNEL_STATE.INACTIVE,
  CHANNEL_STATE.DEBUG,
  CHANNEL_STATE.ACTIVE,
  CHANNEL_STATE.INACTIVE,
];

export default Factory.extend({
  name(i) {
    return `Channel ${i+1}`;
  },
  state(i) {
    return STATES[i];
  }
});
