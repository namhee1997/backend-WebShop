const Cart = require('../model/Cart');

let cartController = {
    //get all cart
    getAllCart: async (req, res) => {
        try {
            console.log('start get all cart');
            let cart = await Cart.find();
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const cart = await Cart.find({
                slug: req.params.slug
            });
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteCart: async (req, res) => {
        try {
            console.log('start delete', req.params.id);
            let data = await Cart.deleteOne({ idPhone: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addCart: async (req, res) => {
        try {
            let cart = req.body;
            console.log(cart, 'cart');
            let checkCurrent = await Cart.checkFound(cart.idPhone);
            console.log(checkCurrent, 'checkCurrent');
            if (checkCurrent) {
                let cartNew = new Cart(cart);
                cartNew.save(function (err, results) {
                    if (err) {
                        return res.status(200).json('add err!');
                    }
                    else {
                        console.log(cartNew, 'cartNew');
                        res.status(200).json(cartNew);
                    }
                });
            } else {

                Cart.findOne({ idPhone: cart.idPhone }).then(doc => {
                    doc.totalCurrent = doc.totalCurrent + 1
                    doc.save();

                })
            }
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateCart: async (req, res) => {
        try {
            let cart = req.body;
            // console.log('updatecart', cart);
            let data = await Cart.findByIdAndUpdate(cart._id, cart);
            console.log('update success cart');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    deleteAllCart: async (req, res) => {
        try {
            let cart = req.body;
            console.log('remove all cart');
            let data = await Cart.remove({});
            console.log('remove success cart');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = cartController;

