class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excluededFields = ['sort', 'limit', 'page', 'fields'];
    excluededFields.forEach(el => delete queryObj[el]);
    let Querystr = JSON.stringify(queryObj);
    Querystr = Querystr.replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(Querystr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const queryFields = this.queryString.fields.split(',').join(' ');
      console.log(queryFields);
      this.query = this.query.select(queryFields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
