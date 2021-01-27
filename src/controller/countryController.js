const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();
const db = admin.firestore();

router.get('/country', async (req, res) => {
    const collection = db.collection('countries');

    if (req.query.id) {
        const doc = await collection.doc(req.query.id).get();

        if (doc.data()) {
            res.send(doc.data());
        } else {
            res.sendStatus(404);
        }
    } else {
        const snapshot = await collection.get();

        res.send(snapshot.docs.map(doc => doc.data()));
    }
})

router.post('/country', async (req, res) => {
    const collection = db.collection('countries');

    if (req.body.id && req.body.capital && req.body.desc) {
        await collection.doc(req.body.id).set({
            capital: req.body.capital,
            desc: req.body.desc
        })

        res.sendStatus(202);
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;