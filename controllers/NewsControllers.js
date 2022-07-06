const NewsCustom = require('../model/News');

let newsController = {
    //get all news
    getAllNewsCustom: async (req, res) => {
        try {
            console.log('start get all news');
            let news = await NewsCustom.find();
            return res.status(200).json(news);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const news = await NewsCustom.find({
                slug: req.params.slug
            });
            return res.status(200).json(news);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteNewsCustom: async (req, res) => {
        try {
            let data = await NewsCustom.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addNewsCustom: async (req, res) => {
        try {
            let news = req.body;


            console.log(news, 'news');

            let newsNew = new NewsCustom(news);

            newsNew.save(function (err, results) {
                if (err) {
                    return res.status(200).json('add err!');
                }
                else {
                    console.log('add success news');
                    res.status(200).json('add success!');
                }
            });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateNewsCustom: async (req, res) => {
        try {
            let news = req.body;
            console.log('updatenews', news);
            let data = await NewsCustom.findByIdAndUpdate(news._id, news);
            console.log('update success news');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = newsController;

