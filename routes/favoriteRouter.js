const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");

const router = express.Router();

router.route("/")
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({user: req.user._id})
    .populate(user.ref)
    .populate(campsites.ref)
    .then( favorites => {
        res.status = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites)
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {
            console.log(req.body)
            req.body.forEach(campsite => {
                if (!favorite.includes(campsite._id)) {
                    favorite.campsite.push(campsite._id);
                }
                favorite.save();
            })  
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader = ("Content-Type", "application/json");
                res.json(favorite);
            })
            .catch(err => next(err))
        } else {
            Favorite.create({user: req.user._id, campsites: req.body.campsite})
            .then(favorite => {
                res.status = 200;
                res.setHeader = ("Content-Type", "application/json");
                res.json(favorite);
                favorite.save()
            })
        }
    })
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorite");
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    findOneAndDelete({user: req.user._id})
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response)
    })
});

router.route("/:campsiteId")
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /favorite/:campsiteId");
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    findOne({user: req.user._id})
    .then(favorites => {
       if(favorites.campsites.includes(req.params.campsiteId)) {
           res.end("That campsite is already in the list of favorties!");
       }
       else {
        Favorite.create({campsites: req.params.campsiteId})
        .then(favorite => {
            res.status = 200;
            res.setHeader = ("Content-Type", "application/json");
            res.json(favorite);
            favorite.save()
        })
       }
    })
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorite/:campsiteId");
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    findOne({user: req.user._id})
    .then(favorite => {
        if (favortie) {
            const index = favorite.campsites.indexOf(req.params.campsiteId);
            if (index >= 0) {
                favorite.campsites.splice(index, 1);
            }
            favorite.save()
            .then(favortie => {
                console.log("Favorite Campsite Deleted!", favorite);
                res.status = 200;
                res.setHeader = ("Content-Type", "application/json");
                res.json(favorite);
            }).catch(err => next(err))
        } else {
            res.status = 200;
            res.setHeader = ("Content-Type", "application/json");
            res.end("You do not have any favorites to delete.")
        }
    }).catch(err => next(err))
});

module.exports = router;