const Product = require('../model/Product');

let productController = {
    //get all user
    getAllProduct: async (req, res) => {
        try {
            let product = await Product.find();
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const product = await Product.find({
                slug: req.params.slug
            });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let data = await Product.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addProduct: async (req, res) => {
        try {
            let product = req.body;
            let productArr = [];

            for (let i = 0; i < product.length; i++) {
                let dataArr = {};
                dataArr['idVariable'] = `T${i + 1}`;
                dataArr['title'] = product[i].variable;
                dataArr['avatar'] = product[i].data.avatar;
                dataArr['price'] = parseInt(product[i].price);
                dataArr['cost'] = parseInt(product[i].cost);
                dataArr['sale'] = parseInt(product[i].sale);
                dataArr['listimg'] = product[i].data.img;

                productArr.push(dataArr);
            }

            let dataProductSave = {
                slug: product[0].slug,
                title: product[0].title,
                promotion: product[0].promotion == 'true' ? true : false,
                variable: productArr,
                infophone: {
                    chip: product[0].infophone.chip,
                    memory: product[0].infophone.memory,
                    ram: product[0].infophone.ram,
                    screen: product[0].infophone.screen,
                },
                company: product[0].company,
            };

            console.log('add product', dataProductSave);
            let productNew = new Product(dataProductSave);

            productNew.save(function (err, results) {
                if (err) {
                    console.log('add product err', err);
                    return res.status(200).json('add err!');
                }
                else {
                    console.log('add product success');
                    res.status(200).json('add success!');
                }
            });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateProduct: async (req, res) => {
        try {
            let product = req.body;

            let data = await Product.findByIdAndUpdate(product._id, product);
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    getProductRelater: async (req, res) => {
        try {
            console.log(req.params, 'getProductRelater');
            const productRelater = await Product.find({
                company: req.params.slug
            });
            console.log(productRelater, 'productRelater');
            return res.status(200).json(productRelater);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
}

module.exports = productController;

