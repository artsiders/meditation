const dayjs = require('dayjs');
const XLSX = require("xlsx")
const Evangile = require("../models/envangile.model")

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
    }).catch(error => console.log(error))

}