const User = require('../models/user.model');
const Subscription = require('../models/subscription.model');


module.exports.get = (_, res) => {
    User.find().then(
        (users) => {
            res.status(200).json({
                error: false,
                message: "",
                data: users
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "impossible de d'obtenie les donnée pour le moment",
                data: []
            });
        }
    );
}

module.exports.getOne = (req, res) => {
    User.findOne({ _id: req.params.id }).then(
        (users) => {
            Subscription.findOne({ userId: users._id.toString() }).then(
                (subscription) => {
                    subscription === null ? subscription = {} : subscription;
                    const datas = {
                        error: false,
                        message: "",
                        data: { ...users._doc, subscription: subscription },
                    }
                    res.status(400).json(datas);
                }).catch((error) => console.log(error));
        }).catch((error) => {
            res.status(400).json({
                error: true,
                message: "utilisateur non trouver",
                data: [],
            });
            console.log(error);
        });
}


module.exports.post = (req, res, _) => {
    const users = new User({
        fullName: req.body.fullName,
        profil: req.body.profil,
        phone: req.body.phone,
    });
    users.save().then(() => {
        res.status(201).json({
            error: false,
            message: "utilisateur ajouter avec succès",
            data: [],
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: true,
            message: "impossible d'ajouter l'utilisateur",
            data: [],
        });
    }
    );
}

module.exports.delete = (req, res) => {
    User.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                error: false,
                message: "utilisateur supprimer avec succès",
                data: [],
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "impossible de modifier l'utilisateur",
                data: [],
            });
        }
    );
}

module.exports.patch = (req, res) => {
    const users = new User({
        _id: req.params.id,
        fullName: req.body.fullName,
        profil: req.body.profil,
        phone: req.body.phone,
    });
    User.updateOne({ _id: req.params.id }, users).then(
        () => {
            res.status(201).json({
                error: false,
                message: "utilisateur modifier avec succès",
                data: [],
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "impossible de modifier l'utilisateur",
                data: [],
                error: error
            });
        }
    );
}