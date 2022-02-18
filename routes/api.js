const express = require("express");
const router = express.Router();
const Bidding = require('../models/bidding');

router.get("/bidding", async (req, res) => {
    instructorSearchTerms = req.query.instructor.split(" ");
    var regex = [];
    for (var i = 0; i < instructorSearchTerms.length; i++) {
        regex[i] = new RegExp(instructorSearchTerms[i], 'i');
    }

    try {
        const bidding = await Bidding.find(
            {
                term: req.query.term,
                courseCode: req.query.courseCode,
                biddingWindow: req.query.biddingWindow,
                instructor: { $all: regex }
            }
        );
        res.send(bidding);
    } catch (error) {
        res.send(error);
    }
});

router.get("/instructors", async (req, res) => {
    try {
        const bidding = await Bidding.find(
            {
                term: req.query.term,
                courseCode: req.query.courseCode.toUpperCase(),
                biddingWindow: req.query.biddingWindow
            }
        ).distinct('instructor');

        if (bidding.length > 0) {
            res.status(200).send(bidding);
        } else if (bidding.length == 0) {
            res.status(204).send();
        }

    } catch (error) {
        res.send(error);
    }
});

router.get("/graphOption1", async (req, res) => {
    try {
        const bidding = await Bidding.find({
            term: req.query.term,
            courseCode: req.query.courseCode,
            instructor: req.query.instructor,
            section: req.query.section
        });
        res.send(bidding);
    } catch (error) {
        res.send(error);
    }
})

router.get("/graphOption2", async (req, res) => {
    try {
        const bidding = await Bidding
            .find({
                term: req.query.term,
                courseCode: req.query.courseCode,
            }, "biddingWindow instructor minBid medianBid section -_id");
        res.send(bidding);
    } catch (error) {
        res.send(error);
    }
})

router.get("/courseCode", async (req, res) => {
    try {
        searchTerms = req.query.description.split(" ");
        var regex = [];
        for (var i = 0; i < searchTerms.length; i++) {
            regex[i] = new RegExp(searchTerms[i], 'i');
        }

        const result = await Bidding.find(
            { description: { $all: regex } },
            { courseCode: 1, description: 1 }
        )

        const uniqueResult = [...new Map(result.map(item =>
            [item['courseCode'], item])).values()];

        if (result.length > 0) {
            res.status(200).send(uniqueResult);
        } else if (result.length == 0) {
            res.status(204).send();
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;