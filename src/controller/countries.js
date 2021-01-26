const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();
const db = admin.firestore();

router.get('/country', async (req, res) => {
    const collection = db.collection('countries');
    const doc = await collection.doc(req.query.id).get();

    res.send(doc.data());
})

module.exports = router;