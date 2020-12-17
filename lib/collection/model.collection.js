'use strict';

class Mongo{
  constructor(model) {
    this.model = model;
  }

  create(object) {
    const data = new this.model(object);
    return data.save();
  }

  get(id){
    if(id){
      return this.model.find({_id: id})
    }
    else {
      console.log('i am the get');
      console.log(this.model.find({}))
      return this.model.find({})
    }
  }

  update(object, id){
    return this.model.findByIdAndUpdate(id, object, {new: true})
  }

  delete(id){
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = Mongo;