const dayjs = require('dayjs');
const Subscription = require('../models/subscription.model');


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
            res.status(404).json({
                error: true,
                message: error,
                data: []
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
            res.status(404).json({
                error: true,
                message: error,
                data: []
            });
        }
    );
}


module.exports.post = (req, res, _) => {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    const checkDate = (date) => dayjs(date, "DD-MM-YYYY", false).isValid()

    if (!checkDate(startDate) || !checkDate(endDate)) {
        res.status(400).json({
            error: true,
            message: "les dates ne sont pas valides !",
            data: []
        });
        return
    }

    if (startDate > endDate) {
        res.status(400).json({
            error: true,
            message: "la date de début ne peut être plus avancé que celle de fin",
            data: []
        });
        return
    }

    const subscriptions = new Subscription({
        userId: req.body.userId,
        startDate: startDate,
        endDate: endDate,
    });
    subscriptions.save().then(() => {
        res.status(201).json({
            error: false,
            message: "Souscription réussie !",
            data: []
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: true,
            message: "La souscription a échoué !",
            data: []
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
                data: []
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "Impossible d'annuler la souscription",
                data: []
            });
        }
    );
}