import Ember from 'ember';
import DELIMITER from 'data-ops/utils/delimiter-constants';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  channel: null,
  rawFields: null,
  rawFieldSort: Ember.computed('sortColumn', 'sortDirection', function() {
    return [`${this.get('sortColumn')}:${this.get('sortDirection')}`];
  }),
  sortedRawFields: Ember.computed.sort('rawFields', 'rawFieldSort'),

  sortColumn: 'name',
  sortDirection: 'asc',

  showNameSort: Ember.computed.equal('sortColumn', 'name'),
  showNumberSort: Ember.computed.equal('sortColumn', 'columnNumber'),
  showStatusSort: Ember.computed.equal('sortColumn', 'status'),

  delimiters: [
    DELIMITER.PIPE,
    DELIMITER.TAB,
    DELIMITER.COMMA,
    DELIMITER.SEMICOLON
  ],

  init() {
    this._super(...arguments);

    this.get('store').query('raw-field', { channelId: this.get('channel.id') }).then((rawFields) => {
      this.set('rawFields', rawFields);
    });
  },

  actions: {
    sortGrid(columnName) {
      let sortColumn = this.get('sortColumn');
      let sortDirection = this.get('sortDirection');

      if (sortColumn === columnName) {
        if (sortDirection === 'asc') {
          this.set('sortDirection', 'desc');
        } else {
          this.set('sortDirection', 'asc');
        }
      } else {
        this.set('sortColumn', columnName);
        this.set('sortDirection', 'asc');
      }
    }
  }
});
