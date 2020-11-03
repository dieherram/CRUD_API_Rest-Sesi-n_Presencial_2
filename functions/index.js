const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

app.get("/users", async (req, res) => {
  const users = await admin
    .firestore()
    .collection("users")
    .get();
  let beerList = [];

  users.forEach((beer) => {
    beerList.push({ id: beer.id, data: beer.data() });
  });

  res.send(beerList);
});

app.get("/users/:id", async (req, res) => {
  const beer = await admin
    .firestore()
    .collection("users")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return { id: doc.id, data: doc.data() };
      } else {
        console.log("No such document!");
        return {};
      }
    });
  res.send(beer);
});

app.post("/users", async (req, res) => {
  await admin
    .firestore()
    .collection("users")
    .add(req.body);
  res.send(req.body);
});

app.delete("/users/:id", async (req, res) => {
  const beer = await admin
    .firestore()
    .collection("users")
    .doc(req.params.id)
    .delete();
  res.send(beer);
});

app.put("/users/:id", async (req, res) => {
  const beer = await admin
    .firestore()
    .collection("users")
    .doc(req.params.id)
    .update(req.body)
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return {};
      }
    });
  res.send(beer);
});


exports.api = functions.https.onRequest(app)