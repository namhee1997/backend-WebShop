const SlidesCustom = require('../model/SlidesCustom');

let slidesController = {
    //get all user
    getAllSlidesCustom: async (req, res) => {
        try {
            console.log('start get all slides');
            let slides = await SlidesCustom.find();
            return res.status(200).json(slides);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const slides = await SlidesCustom.find({
                slug: req.params.slug
            });
            return res.status(200).json(slides);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteSlidesCustom: async (req, res) => {
        try {
            let data = await SlidesCustom.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addSlidesCustom: async (req, res) => {
        try {
            let slides = req.body;


            console.log(slides, 'slides');

            let slidesNew = new SlidesCustom(slides);

            slidesNew.save(function (err, results) {
                if (err) {
                    return res.status(200).json('add err!');
                }
                else {
                    console.log('add success slides');
                    res.status(200).json('add success!');
                }
            });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateSlidesCustom: async (req, res) => {
        try {
            let slides = req.body;
            console.log('updateslides', slides);
            let data = await SlidesCustom.findByIdAndUpdate(slides._id, slides);
            console.log('update success slides');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = slidesController;

