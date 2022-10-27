const Meditation = require("../models/meditation.model");
const { faker } = require("@faker-js/faker");

module.exports.fakeMeditaton = (_, res) => {
    try {
        for (let i = 0; i < 10; i++) {
            let fake = new Meditation({
                ref: faker.name.firstName(),
                content: faker.lorem.paragraph(),
                startDate: faker.date.between('2022-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
                date: faker.date.between('2022-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
                endDate: faker.date.between('2022-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),

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
    }
    res.status(200).json({
        error: false,
        message: "donnée généré avec succès !",
        data: []
    })
}