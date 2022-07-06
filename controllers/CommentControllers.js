const CommentProduct = require('../model/CommentProduct');

let commentController = {
    //get all comment
    getAllComment: async (req, res) => {
        try {
            let comment = await CommentProduct.find();
            return res.status(200).json(comment);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const comment = await CommentProduct.find({
                idPhone: req.params.id
            });

            return res.status(200).json(comment);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteComment: async (req, res) => {
        try {
            let data = await CommentProduct.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addComment: async (req, res) => {
        try {
            let comment = req.body;

            let commentNew = new CommentProduct(comment);

            commentNew.save(function (err, results) {
                if (err) {
                    return res.status(200).json('add err!');
                }
                else {
                    console.log('add success comment');
                    res.status(200).json('add success!');
                }
            });

        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateComment: async (req, res) => {
        try {
            let cart = req.body;
            delete cart['status'];

            await CommentProduct.findOne({ idComment: cart.idComment }).then(doc => {
                let arrCurrent = [...doc.listReply, cart];
                doc.listReply = arrCurrent;
                doc.save();

            })
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = commentController;

