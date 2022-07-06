const OrderSuccess = require('../model/OrderSuccess');

let orderSuccessController = {
    //get all orderSuccess
    getAllOrderSuccess: async (req, res) => {
        try {
            console.log('start get all orderSuccess');
            let orderSuccess = await OrderSuccess.find();
            return res.status(200).json(orderSuccess);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const orderSuccess = await OrderSuccess.find({
                slug: req.params.slug
            });
            return res.status(200).json(orderSuccess);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteOrderSuccess: async (req, res) => {
        try {
            let data = await OrderSuccess.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addOrderSuccess: async (req, res) => {
        try {
            let orderSuccess = req.body;


            console.log(orderSuccess, 'orderSuccess');

            let orderSuccessNew = new OrderSuccess(orderSuccess);

            orderSuccessNew.save(function (err, results) {
                if (err) {
                    return res.status(200).json('add err!');
                }
                else {
                    console.log('add success orderSuccess');
                    res.status(200).json('add success!');
                }
            });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateOrderSuccess: async (req, res) => {
        try {
            let orderSuccess = req.body;
            console.log('updateorderSuccess', orderSuccess);
            let data = await OrderSuccess.findByIdAndUpdate(orderSuccess._id, orderSuccess);
            console.log('update success orderSuccess');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = orderSuccessController;

