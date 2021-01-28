const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();
const db = admin.firestore();
const collection = db.collection('countries');

router.get('/country', async (req, res) => {
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
    if (req.body.id && req.body.capital && req.body.desc && req.body.avatar) {
        const snapshot = await collection.doc(req.body.id).get();

        if (!snapshot.exists) {
            await collection.doc(req.body.id).set({
                capital: req.body.capital,
                desc: req.body.desc,
                avatar: req.body.avatar
            })

            res.sendStatus(202);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
})

router.put('/country', async (req, res) => {
    if (req.body.id) {
        const snapshot = await collection.doc(req.body.id).get();

        if (snapshot.exists) {
            await collection.doc(req.body.id).set({
                capital: req.body.capital ? req.body.capital : snapshot.data().capital,
                desc: req.body.desc ? req.body.desc : snapshot.data().desc,
                avatar: req.body.avatar ? req.body.avatar : snapshot.data().avatar
            })

            res.sendStatus(202);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
})

router.delete('/country', async (req, res) => {
    if (req.body.id) {
        const snapshot = await collection.doc(req.body.id).get();

        if (snapshot.exists) {
            await collection.doc(req.body.id).delete();

            res.sendStatus(202);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;