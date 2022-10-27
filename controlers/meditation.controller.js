const Meditation = require('../models/meditation.model');
const dayjs = require('dayjs')


module.exports.get = (req, res) => {
    let startDate = req.query.startDate
    let endDate = req.query.endDate

    const checkDate = (date) => dayjs(date, "DD-MM-YYYY", false).isValid()

    if (!checkDate(startDate) || !checkDate(endDate)) {
        res.status(400).json({
            error: true,
            message: "les dates ne sont pas valide !",
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

    Meditation.find({ date: { $gte: startDate, $lte: endDate } }).then(
        (meditation) => {
            res.status(200).json({
                error: false,
                message: "",
                data: meditation,
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

module.exports.getAtDate = (_, res) => {
    Meditation.find().then(
        (meditation) => {
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
                message: error,
                data: []
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
            message: 'successfully'
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: "ERREUR" + error
        });
    }
    );
}

module.exports.delete = (req, res) => {
    Meditation.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.put = (req, res) => {
    const meditation = new Meditation({
        _id: req.params.id,
        ref: req.body.ref,
        date: req.body.date,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        content: req.body.content,
    });
    Meditation.updateOne({ _id: req.params.id }, meditation).then(
        () => {
            res.status(201).json({
                message: 'updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}