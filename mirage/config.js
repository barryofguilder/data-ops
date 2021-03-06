export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('/channels');
  this.get('/channels/:id');

  this.get('/field-mappings');
  this.get('/field-mappings/:id');

  this.get('/conversion-functions');
  this.get('/conversion-functions/:id');

  this.get('/raw-fields', ({ rawFields }, request) => {
    let channelId = request.queryParams.channelId;

    if (channelId) {
      return rawFields.where({ channelId });
    }

    return rawFields;
  });
  this.get('/raw-field/:id');

  this.get('/business-keys');
  this.get('/business-keys/:id');
}
