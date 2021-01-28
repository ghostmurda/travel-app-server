const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();
const db = admin.firestore();
const collection = db.collection('media');

router.get('/', async (req, res) => {
    if (req.query.id) {
        const doc = await collection.doc(req.query.id).get();

        if (doc.data()) {
            res.send(doc.data());
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;