const Meditation = require('../models/meditation.model');
const dayjs = require('dayjs');
const { replaceAll } = require('../helpers/function');


module.exports.get = (req, res, next) => {
    if (req.query.startDate === undefined) {
        next()
        return
    }

    let startDate = replaceAll('"', '', req.query.startDate)
    let endDate = replaceAll('"', '', req.query.endDate)
    startDate = replaceAll("'", '', startDate)
    endDate = replaceAll("'", '', endDate)

    const checkDate = (date) => dayjs(date, "YYYY-MM-DD", false).isValid()

    if (!checkDate(startDate) || !checkDate(endDate)) {
        res.status(400).json({
            error: true,
            message: "les dates ne sont pas valide !",
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
    Meditation.find({ date: { $gte: startDate, $lte: endDate } })
        .sort({ date: 1 })
        .then(
            (meditation) => {
                if (meditation.length == 0) {
                    res.status(404).json({
                        error: false,
                        message: "Aucune méditation pour cette interval de date!",
                        data: {},
                    });
                } else {
                    res.status(200).json({
                        error: false,
                        message: "",
                        data: meditation,
                    });
                }

            }
        ).catch(
            (error) => {
                console.log(error);
                res.status(404).json({
                    error: true,
                    message: "",
                    data: {}
                });
            }
        );
}


module.exports.getAtDate = (req, res) => {
    let date = replaceAll('"', '', req.query.date);
    date = replaceAll("'", '', date);

    Meditation.findOne({ date: date }).then(
        (meditation) => {
            if (meditation.length == 0) {
                res.status(404).json({
                    error: false,
                    message: "Aucune méditation pour cette date!",
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "",
                    data: meditation,
                });
            }
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: true,
                message: "pas de meditation disponible pour cette date",
                data: {}
            });
        }
    );
}

module.exports.getById = (req, res) => {
    Meditation.find({ _id: req.params.id }).then(
        (meditation) => {
            if (meditation.length == 0) {
                res.status(404).json({
                    error: false,
                    message: "Méditation introuvable!",
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "",
                    data: meditation,
                });
            }
            res.status(200).json({
                error: false,
                message: "",
                data: meditation
            });
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: true,
                message: "impossible de trouver cette meditation",
                data: {}
            });
        }
    );
}


module.exports.post = (req, res, _) => {
    const meditation = new Meditation({
        ref: req.body.ref,
        date: req.body.date,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        content: req.body.content,
    });
    meditation.save().then(() => {
        res.status(201).json({
            error: false,
            message: "méditation ajouter avec succès",
            data: {},
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: true,
            message: "impossible d'ajouter la méditation",
            data: {},
        });
    }
    );
}

module.exports.delete = (req, res) => {
    Meditation.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                error: false,
                message: "méditation supprimer !",
                data: {},
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "impossible de supprimer la méditation",
                data: {},
            });
        }
    );
}

module.exports.put = (req, res) => {
    const meditation = new Meditation({
        _id: req.params.id,
        ref: req.body.ref,
        date: req.body.date,
        content: req.body.content,
    });
    Meditation.updateOne({ _id: req.params.id }, meditation).then(
        () => {
            res.status(201).json({
                error: false,
                message: "méditation modifier avec succès",
                data: {},
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: true,
                message: "impossible de modifier la méditation",
                data: {},
            });
        }
    );
}