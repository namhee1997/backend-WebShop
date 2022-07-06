const Company = require('../model/Company');

let productController = {
    //get all user
    getAllCompany: async (req, res) => {
        try {
            console.log('start get all company');
            let company = await Company.find();
            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const company = await Company.find({
                slug: req.params.slug
            });
            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteCompany: async (req, res) => {
        try {
            let data = await Company.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addCompany: async (req, res) => {
        try {
            let company = req.body;
            let dataCustom = {
                src: company.avatar,
                title: company.title,
                slug: company.slug
            };

            console.log(dataCustom, 'company');

            let companyNew = new Company(dataCustom);

            companyNew.save(function (err, results) {
                if (err) {
                    return res.status(200).json('add err!');
                }
                else {
                    console.log('add success company');
                    res.status(200).json('add success!');
                }
            });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateComapny: async (req, res) => {
        try {
            let company = req.body;
            console.log('updatecompany', company);
            let data = await Company.findByIdAndUpdate(company._id, company);
            console.log('update success company');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = productController;

