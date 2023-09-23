class CoreModel {
    _id;
    _created_at;
    _updated_at;

    get id() {
        return this._id;
    }

    get created_at() {
        return this._created_at;
    }

    get updated_at() {
        return this._updated_at;
    }

    set created_at(value) {
        this._created_at = value;
    }

    set updated_at(value) {
        this._updated_at = value;
    }

    async findOne(id) {
        try {
            
        } catch (error) {
          console.log(error);
        }
    }
    
    async findAll() {
        try {
            
        } catch (error) {
          console.log(error);
        }
    }
    
    async create() {
        try {
          
        } catch (error) {
          console.log(error);
        }
    }
    
    async update(id) {
        try {
          
        } catch (error) {
          console.log(error);
        }
    }
    
    async delete(id) {
        try {
          
        } catch (error) {
          console.log(error);
        }
    }
};

module.exports = CoreModel;