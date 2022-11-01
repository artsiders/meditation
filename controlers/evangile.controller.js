const dayjs = require('dayjs');
const XLSX = require("xlsx")
const Evangile = require("../models/envangile.model")
const axios = require('axios')

module.exports.post = (req, res) => {
    var workbook = XLSX.readFile('./uploads/' + req.file.filename);
    var sheetNameList = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNameList[0]]
    const datas = XLSX.utils.sheet_to_json(worksheet)

    let resultDatas = []

    const convertToDate = (dateString) => {
        // return typeof dateString
        if (dateString != undefined) {
            try {
                let d = dateString.split("/");
                let dat = new Date(d[2] + '-' + d[1] + '-' + d[0]);
                dat = dayjs(dat).format("YYYY-MM-DD")
                return dat;
            } catch (error) {
                return ""
            }
        }
        return ""
    }

    datas.forEach(data => {
        data.Date = convertToDate(data.Date)
        resultDatas.push(data)
    });
    Evangile.insertMany(resultDatas).then(() => {
        res.status(201).json({
            error: false,
            message: "Fichier excel importer avec succès !",
            data: {},
        });
    }).catch(error => {
        res.status(500).json({
            error: true,
            message: "Impossible d'importer le fichier",
            data: {},
        });
    })

}


module.exports.getByDate = (req, res) => {
    Evangile.findOne({ Date: req.params.date }).then(
        (evangile) => {

            axios.get(`https://api.aelf.org/v1/messes/${req.params.date}/afrique`)
                .then(axiosRes => {
                    if (axiosRes.status == 200) {
                        axiosRes.data === null ? axiosRes.data = {} : axiosRes.data;
                        const datas = { ...evangile._doc, evangile: axiosRes.data.messes.lectures.filter((elt) => elt.type == "evangile") }

                        res.status(200).json({
                            error: false,
                            message: "",
                            data: datas
                        });
                    }
                }).catch((error) => {
                    res.status(404).json({
                        error: true,
                        message: "Aucun évangile pour cette date !",
                        data: {}
                    });
                });
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: true,
                message: "Aucun évangile pour cette date !",
                data: {}
            });
        }
    );
}
