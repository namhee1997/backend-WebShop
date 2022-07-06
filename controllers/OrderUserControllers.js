const OrderUser = require('../model/OrderUser');

let orderUserController = {
    //get all orderUser
    getAllOrderUser: async (req, res) => {
        try {
            console.log('start get all orderUser');
            let orderUser = await OrderUser.find();
            return res.status(200).json(orderUser);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const orderUser = await OrderUser.find({
                slug: req.params.slug
            });
            return res.status(200).json(orderUser);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteOrderUser: async (req, res) => {
        try {
            let data = await OrderUser.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addOrderUser: async (req, res) => {
        try {
            let orderUser = req.body;


            console.log(orderUser, 'orderUser');

            OrderUser.insertMany(orderUser)
                .then(function (docs) {
                    console.log('add multipes success');
                    return res.status(200).json(docs);
                })
                .catch(function (err) {
                    return res.status(500).json(err);
                });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateOrderUser: async (req, res) => {
        try {
            let orderUser = req.body;
            console.log('updateorderUser', orderUser);
            let data = await OrderUser.findByIdAndUpdate(orderUser._id, orderUser);
            console.log('update success orderUser');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = orderUserController;

