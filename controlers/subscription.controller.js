const dayjs = require('dayjs');
const Subscription = require('../models/subscription.model');
const User = require('../models/user.model');


module.exports.get = (_, res) => {
    Subscription.find().then(
        (subscriptions) => {
            res.status(200).json({
                error: false,
                message: "",
                data: subscriptions
            });
        }
    ).catch(
        (error) => {
            res.status(204).json({
                error: true,
                message: error,
                data: {}
            });
        }
    );
}

module.exports.getOne = (req, res) => {
    Subscription.find({ _id: req.params.id }).then(
        (subscriptions) => {
            res.status(200).json({
                error: false,
                message: "",
                data: subscriptions
            });
        }
    ).catch(
        (error) => {
            res.status(204).json({
                error: true,
                message: error,
                data: {}
            });
        }
    );
}


module.exports.post = (req, res, _) => {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    const checkDate = (date) => dayjs(date, "YYYY-MM-DD", false).isValid()

    if (!checkDate(startDate) || !checkDate(endDate)) {
        res.status(400).json({
            error: true,
            message: "les dates ne sont pas valides !",
            data: {}
        });
        return
    }

    if (startDate > endDate) {
        res.status(400).json({
            error: true,
            message: "la date de début ne peut être plus avancé que celle de fin",
            data: {}
        });
        return
    }

    const subscriptions = new Subscription({
        userId: req.body.userId,
        startDate: startDate,
        endDate: endDate,
    });
    subscriptions.save().then((value) => {
        res.status(201).json({
            error: false,
            message: "Souscription réussie !",
            data: value
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: true,
            message: "La souscription a échoué !",
            data: {}
        });
    }
    );
}

module.exports.delete = (req, res) => {
    Subscription.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                error: false,
                message: "Souscription annulée avec succès",
                data: {}
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "Impossible d'annuler la souscription",
                data: {}
            });
        }
    );



}



module.exports.post = (req, res, _) => {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    const checkDate = (date) => dayjs(date, "YYYY-MM-DD", false).isValid()

    if (!checkDate(startDate) || !checkDate(endDate)) {
        res.status(400).json({
            error: true,
            message: "les dates ne sont pas valides !",
            data: {}
        });
        return
    }

    if (startDate > endDate) {
        res.status(400).json({
            error: true,
            message: "la date de début ne peut être plus avancé que celle de fin",
            data: {}
        });
        return
    }

    const subscriptions = new Subscription({
        userId: req.body.userId,
        startDate: startDate,
        endDate: endDate,
    });
    console.log("here")
    Subscription.findOneAndUpdate({ _id: req.params['id'] }, subscriptions, {
        new: true
    }).then(
        (value) => {




            User.findOne({ _id: value.userId.toString() }).then(
                (user) => {
                    user === null ? user = {} : user;
                    const datas = {
                        error: false,
                        message: "",
                        data: { ...user._doc, subscription: value },
                    }
                    res.status(200).json(datas);
                }).catch((error) => console.log(error));



            res.status(200).json({
                error: false,
                message: "update sub",
                data: value,
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "impossible de modifier",
                errors: [error]
            });
        }
    );
}