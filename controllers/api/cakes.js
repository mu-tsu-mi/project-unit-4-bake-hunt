const Cake = require('../../models/cake');

module.exports = {
    index
}

async function index(req, res) {
    const cakes = await Cake.find({}).sort('cakeName').exec();
    // console.log(cakes)
    res.json(cakes)
}