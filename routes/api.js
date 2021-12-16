const express = require("express");
const router = express.Router();
const Bidding = require('../models/bidding');

router.get("/bidding", async (req, res) => {
    try {
        const bidding = await Bidding.find(
            {   
                courseCode: req.query.courseCode,
                biddingWindow: req.query.biddingWindow,
                instructor: req.query.instructor
            }
        );
        res.send(bidding);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;