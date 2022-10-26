const User = require('../models/user.model');


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
            res.status(404).json({
                error: true,
                message: error,
                data: []
            });
        }
    );
}

module.exports.getOne = (req, res) => {
    User.find({ _id: req.params.id }).then(
        (users) => {
            res.status(200).json({
                error: false,
                message: "",
                data: users
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
    const users = new User({
        fullName: req.body.fullName,
        profil: req.body.profil,
        phone: req.body.phone,
    });
    users.save().then(() => {
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
    User.deleteOne({ _id: req.params.id }).then(
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
    const users = new User({
        _id: req.params.id,
        fullName: req.body.fullName,
        profil: req.body.profil,
        phone: req.body.phone,
    });
    User.updateOne({ _id: req.params.id }, users).then(
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