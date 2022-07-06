const User = require('../model/User');

let userController = {
    //get all user
    getAllUser: async (req, res) => {
        try {
            let user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const user = await User.find({
                userId: req.params.id
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            User.remove({
                userId: req.params.id
            }, function (err, user) {
                if (err)
                    return console.error(err);

                res.status(200).json("delete success!");
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addUser: async (req, res) => {
        try {
            let user = req.body;
            delete user['Avatar'];

            User.create(user, function (err, doc) {
                if (err) return err;
                else { res.status(200).json('add success!'); }
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    updateUser: async (req, res) => {
        try {
            let user = req.body;
            console.log('updateUser', user);
            let data = await User.findByIdAndUpdate(user._id, user);
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = userController;

