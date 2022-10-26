const Meditation = require('../models/meditation.model');
const dayjs = require('dayjs')


module.exports.get = (req, res) => {
    let startDate = req.query.startDate
    let date = req.query.date
    let endDate = req.query.endDate

    console.log(startDate, "date", date, "end", endDate);

    const checkDate = (date) => dayjs(date, "DD-MM-YYYY", false).isValid()


    if (!checkDate(startDate) || !checkDate(date) || !checkDate(endDate)) {
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
    } else {
        Meditation.find({
            startDate: dayjs(startDate).format('DD/MM/YYYY'),
            date: dayjs(date).format('DD/MM/YYYY'),
            endDate: dayjs(endDate).format('DD/MM/YYYY'),
        }).then(
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
}

module.exports.getAtDate = (req, res) => {
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
                message: "",
                data: []
            });
        }
    );
}


module.exports.post = (req, res, _) => {
    const meditation = new Meditation({
        id: req.body.emp_firstname,
        ref: req.body.emp_lastname,
        date: req.body.emp_sex,
        content: req.body.emp_phone,
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