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
    const subscriptions = new Subscription({
        fullName: req.body.fullName,
        profil: req.body.profil,
        phone: req.body.phone,
    });
    subscriptions.save().then(() => {
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
    Subscription.deleteOne({ _id: req.params.id }).then(
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
    const subscriptions = new Subscription({
        _id: req.params.id,
        fullName: req.body.fullName,
        profil: req.body.profil,
        phone: req.body.phone,
    });
    Subscription.updateOne({ _id: req.params.id }, subscriptions).then(
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