var store = require('nedb');
var data = new store({filename: 'app/data.db', autoload: true});
data.ensureIndex({ fieldName: 'key', unique: true }, function (err) {
});
exports = module.exports = {
	users: new store(),
	data: data
};