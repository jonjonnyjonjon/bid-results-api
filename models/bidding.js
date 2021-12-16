const mongoose = require('mongoose');

const BiddingSchema = mongoose.Schema({
    term: String,
    session: String,
    biddingWindow: String,
    courseCode: String,
    description: String,
    section: String,
    vacancy: Number,
    openingVacancy: Number,
    beforeProcessVacancy: Number,
    DICE: Number,
    afterProcessVacancy: Number,
    enrolledStudents: Number,
    medianBid: Number,
    minBid: Number,
    instructor: String,
    schOrDept: String,
});

module.exports = mongoose.model("Bidding", BiddingSchema, "biddings");