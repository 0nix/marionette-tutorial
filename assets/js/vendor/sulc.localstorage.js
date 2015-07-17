app.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){
  var getValue = function(attributeOrFunction){
    if(typeof attributeOrFunction === 'function'){
      return attributeOrFunction();
    }
    else{
      return attributeOrFunction;
    }
  };

  var findStorageKey = function(entity){
    // use a model's urlRoot value
    if(entity.urlRoot){
      return getValue(entity.urlRoot);
    }
    // use a collection's url value
    if(entity.url){
      return getValue(entity.url);
    }
    // fallback to obtaining a model's storage key from
    // the collection it belongs to
    if(entity.collection && entity.collection.url){
      return getValue(entity.collection.url);
    }

    throw new Error("Unable to determine storage key");
  };

  var StorageMixin = function(entityPrototype){
    var storageKey = findStorageKey(entityPrototype);
    return { localStorage: new Backbone.LocalStorage(storageKey) };
  };

  Entities.configureStorage = function(entity){
    _.extend(entity.prototype, new StorageMixin(entity.prototype));
  };
});