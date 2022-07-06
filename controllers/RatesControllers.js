const Rates = require('../model/RateProduct');
const CommentRate = require('../model/commentRate.RateCustom');

let ratesController = {
    //get all rates
    getAllRates: async (req, res) => {
        try {
            console.log('start get all rates');
            let rates = await Rates.find();
            return res.status(200).json(rates);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const rates = await Rates.find({
                idPhone: req.params.id
            });
            const ratesComment = await CommentRate.find({
                idPhone: req.params.id
            });
            rates[0].listCommentRate = ratesComment

            return res.status(200).json(rates);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteRates: async (req, res) => {
        try {
            let data = await Rates.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addRates: async (req, res) => {
        try {
            let rates = req.body;
            let checkIsset = await Rates.checkFound(rates.idPhone);
            let dataToRate = {
                idPhone: rates.idPhone,
            };
            let dataToCommentRate = {
                idPhone: rates.idPhone,
                title: rates.title,
                avt: rates.avt,
                user: rates.user,
                start: rates.start,
            };

            if (checkIsset) {
                let ratesNew = new Rates(dataToRate);
                let ratesCommentNew = new CommentRate(dataToCommentRate);

                ratesNew.save(function (err, results) {
                    if (err) {
                        return res.status(200).json('add err!');
                    }
                    else {
                        Rates.findOne({ idPhone: dataToRate.idPhone }).then(doc => {
                            if (dataToCommentRate.start == 5) {
                                doc.totalstart.start5 = doc.totalstart.start5 + 1;
                            }
                            if (dataToCommentRate.start == 4) {
                                doc.totalstart.start4 = doc.totalstart.start4 + 1;
                            }
                            if (dataToCommentRate.start == 3) {
                                doc.totalstart.start3 = doc.totalstart.start3 + 1;
                            }
                            if (dataToCommentRate.start == 2) {
                                doc.totalstart.start2 = doc.totalstart.start2 + 1;
                            }
                            if (dataToCommentRate.start == 1) {
                                doc.totalstart.start1 = doc.totalstart.start1 + 1;
                            }
                            doc.save();

                        })
                        ratesCommentNew.save(function (err, results) {
                            if (err) {
                                console.log('add comment rates err');
                            }
                            else {
                                console.log('add success ratescomment');
                            }
                        })
                        res.status(200).json('add success!');
                    }
                });
            } else {

                await CommentRate.create(dataToCommentRate, function (err, doc) {
                    if (err) {
                        console.log('add comment rates err', err.message);
                    }
                    else {
                        Rates.findOne({ idPhone: dataToRate.idPhone }).then(doc => {
                            if (dataToCommentRate.start == 5) {
                                doc.totalstart.start5 = doc.totalstart.start5 + 1;
                            }
                            if (dataToCommentRate.start == 4) {
                                doc.totalstart.start4 = doc.totalstart.start4 + 1;
                            }
                            if (dataToCommentRate.start == 3) {
                                doc.totalstart.start3 = doc.totalstart.start3 + 1;
                            }
                            if (dataToCommentRate.start == 2) {
                                doc.totalstart.start2 = doc.totalstart.start2 + 1;
                            }
                            if (dataToCommentRate.start == 1) {
                                doc.totalstart.start1 = doc.totalstart.start1 + 1;
                            }
                            doc.save();

                        })
                        console.log('add success ratescomment');
                        res.status(200).json('add success!');
                    }
                });

            }


        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateRates: async (req, res) => {
        try {
            let rates = req.body;
            let data = await Rates.findByIdAndUpdate(rates._id, rates);
            console.log('update success rates');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = ratesController;

