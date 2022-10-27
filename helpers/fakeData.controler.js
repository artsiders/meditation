const Meditation = require("../models/meditation.model");
const { faker } = require("@faker-js/faker");
const dayjs = require("dayjs");

module.exports.fakeMeditaton = (_, res) => {
    const format = (date) => dayjs(date).format("MM-DD-YYYY")
    try {
        for (let i = 0; i < 10; i++) {
            let fake = new Meditation({
                ref: faker.name.firstName(),
                content: faker.lorem.paragraph(),
                startDate: format(faker.date.between('2022-01-01', '2023-01-01')),
                date: format(faker.date.between('2022-01-01', '2023-01-01')),
                endDate: format(faker.date.between('2022-01-01', '2023-01-01')),

            })
            fake.save()
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: "erreur lors de la génération des données",
            data: []
        })
        console.log(error);
        return;
    }
    res.status(200).json({
        error: false,
        message: "donnée généré avec succès !",
        data: []
    })
}