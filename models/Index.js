const User =  require('./user');
const Posts = require('./Posts');
// const Interest = require('./Interest');

User.hasMany(Posts,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Posts };
