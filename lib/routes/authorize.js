'use strict';

const express = require('express');
const router = express.Router();
const User = require('../collection/authorize.collection.js');
const userModel = require('../models/authorize.schema.js');
const authorize = require('../middleware/authorizeBasic.js');
const assignDefaultAssets = require('../middleware/assignDefaultAssets.js');
const verify = require('../middleware/acl.js');

const DB = new User(userModel);

function handleAuthorized(req, res, next){
    res.status(200).send({user: req.user, token: req.token});
};

router.post('/user/signUp', (req, res, next) => {
    try {
        let user = req.body;
        DB.save(user).then(results => {
            req.body.id = results._id
            req.body.token = userModel.generateToken(req.body.name)
                res.status(200).json({results, token: req.body.token});
                next();

        }).catch(err => next(err));
    } catch (error) {
        console.error(error)
    }
}, assignDefaultAssets);

router.post('/user/signIn', authorize, handleAuthorized);

router.get('/user/read', authorize, verify('read'), handleAuthorized);

router.put('/user/update', authorize, verify('update'), handleAuthorized);

router.post('/user/create', authorize, verify('create'), handleAuthorized);

router.delete('/user/delete', authorize, verify('delete'), handleAuthorized);


module.exports = router;