const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const companyRouter = require('./routes/company.routes');
const cloudRoutes = require('./routes/cloud.routes');
const productRoutes = require('./routes/product.routes');
const slidesCustomRoutes = require('./routes/slidesCustom.routes');
const newsRoutes = require('./routes/news.routes');
const orderSuccessRoutes = require('./routes/orderSuccess.routes');
const orderUserRoutes = require('./routes/orderUser.routes');
const cartRoutes = require('./routes/cart.routes');
const rateProductRoutes = require('./routes/rateProduct.routes');
const commentProductRoutes = require('./routes/commentProduct.routes');

const dbUser = require('./model/User');
const dbUserOrder = require('./model/OrderUser');
const dbProduct = require('./model/Product');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(cookieParser());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));

mongoose
    .connect(process.env.DB_MONGOO_LIVE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('CONNECTED MONGODB');
        initial();
        initialOrderUser();
        // initialProduct()
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//DATA CURRENT

function initial() {
    dbUser.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new dbUser({
                username: 'admin',
                role: 'admin',
                fullname: 'vivannam',
                avatar: 'testAvatar',
                address: 'vinh NA',
                email: 'nam@gmail.com',
                phone: '0987878721',
                password: bcrypt.hashSync("123456", 8)
            }).save((err, user) => {
                if (err) {
                    console.log("init error", err);
                }
                console.log("create admin");
            })
        }
    })
}

function initialOrderUser() {
    dbUserOrder.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new dbUserOrder({
                slug: 'iphone_11',
                title: 'iphone 11',
                price: 100000,
                cost: 120000,
                userbuy: 'U0002',
                promotion: 1,
                idPhone: 't1'
            }).save((err, user) => {
                if (err) {
                    console.log("init error", err);
                }
                console.log("create order");
            })
        }
    })
}

// function initialProduct() {
//     dbProduct.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new dbProduct({
//                 slug: 'test_product',
//                 promotion: true,
//                 variable: [
//                     {
//                         idVariable: 't1',
//                         title: 'variable 1',
//                         avatar: 'test AVT',
//                         price: 5000000,
//                         cost: 5500000,
//                         sale: 500000,
//                         listimg: [{ thumb: 'tesst list img' }]
//                     }
//                 ],

//                 infophone: {
//                     chip: 'i5',
//                 },
//                 company: 'Vivo',

//             }).save((err, user) => {
//                 if (err) {
//                     console.log("init error", err);
//                 }
//                 console.log("create product");
//             })
//         }
//     })
// }




app.use(express.json());

//ROUTES

app.use('/v1/auth', authRoutes);
app.use('/v1/user', userRouter);
app.use('/v1/cloud', cloudRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/company', companyRouter);
app.use('/v1/slides', slidesCustomRoutes);
app.use('/v1/news', newsRoutes);
app.use('/v1/order-success', orderSuccessRoutes);
app.use('/v1/order-user', orderUserRoutes);
app.use('/v1/cart', cartRoutes);
app.use('/v1/rate-product', rateProductRoutes);
app.use('/v1/comment-product', commentProductRoutes);

app.listen(8080, () => {
    console.log('is running server success!');
})

//AUTHENTICATION SS DANG NHAP

//AUTHORIZATION PHAN QUYEN

//JSON WEB TOKEN