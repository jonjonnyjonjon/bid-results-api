const express = require("express");
const router = express.Router();
const Bidding = require('../models/bidding');

router.get("/bidding", async (req, res) => {
    const userInput = req.query.userInput;
    let [term, courseCode, biddingWindow, instructor] = userInput.split(", ");
    let bwSplit = biddingWindow.split("R").join("").split("W");
    let bwFormatted = `Round ${bwSplit[0]} Window ${bwSplit[1]}`;
    try {
        const bidding = await Bidding.find(
            {   
                term: term,
                courseCode: courseCode.toUpperCase(),
                biddingWindow: bwFormatted,
                instructor: instructor.toUpperCase()
            }
        );
        res.send(bidding);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;