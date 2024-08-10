const Cake = require('../../models/cake');

module.exports = {
    index,
    showDetail,
}

async function index(req, res) {
    const cakes = await Cake.find({}).sort('cakeName');
    res.json(cakes)
}

async function showDetail(req, res) {
    const cake = await Cake.findOne({cakeNickname: req.params.cakeNickname});
    res.json(cake)
}