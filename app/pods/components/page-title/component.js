import Ember from 'ember';

const PageTitleComponent = Ember.Component.extend({
  classNames: ['page-title'],

  title: Ember.computed('params.[]', function() {
    let params = this.get('params');

    return params[0];
  })
});

PageTitleComponent.reopenClass({
  positionalParams: 'params'
});

export default PageTitleComponent;
