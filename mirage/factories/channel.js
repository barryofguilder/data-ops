import { Factory } from 'ember-cli-mirage';
import CHANNEL_STATE from 'data-ops/utils/channel-constants';
import DELIMETER from 'data-ops/utils/delimeter-constants';

const STATES = [
  CHANNEL_STATE.LIVE,
  CHANNEL_STATE.LIVE,
  CHANNEL_STATE.IN_IMPLEMENTATION,
  CHANNEL_STATE.TEST,
  CHANNEL_STATE.LIVE,
  CHANNEL_STATE.INACTIVE,
];
const DELIMETERS = [
  DELIMETER.PIPE,
  DELIMETER.PIPE,
  DELIMETER.TAB,
  DELIMETER.PIPE,
  DELIMETER.COMMA,
  DELIMETER.PIPE
];

export default Factory.extend({
  name(i) {
    return `Channel ${i+1}`;
  },
  state(i) {
    return STATES[i];
  },
  rawFileDelimeter(i) {
    return DELIMETERS[i];
  }
});
