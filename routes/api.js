const express = require("express");
const router = express.Router();
const Bidding = require('../models/bidding');

router.get("/bidding", async (req, res) => {
    try {
        const bidding = await Bidding.find(
            {   
                term: req.query.term,
                courseCode: req.query.courseCode,
                biddingWindow: req.query.biddingWindow,
                instructor: req.query.instructor
            }
        );
        res.send(bidding);
    } catch (error) {
        res.send(error);
    }
});

router.get("/forGraph", async (req, res) => {
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

module.exports = router;