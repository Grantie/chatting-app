const express = require("express");
const app = express();

const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, onValue, get } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyB17d6g6mBy1QR9uN5LYiABSU0eBYJv4TQ",
  authDomain: "tikogrant-chatting-app.firebaseapp.com",
  projectId: "tikogrant-chatting-app",
  storageBucket: "tikogrant-chatting-app.appspot.com",
  messagingSenderId: "291146689166",
  appId: "1:291146689166:web:ceb6b4e12c3a5b3ef1b7df"
};

const fbApp = initializeApp(firebaseConfig);
const db = getDatabase(fbApp);

app.set("view-engine","ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/sendMsg", async (req, res) => {
    await get(ref(db, "/lastMsg")).then(async (snapshot) => {
        const lastMsg = snapshot.val();
        await set(ref(db, `/msgs/${lastMsg + 1}`), {
            content: req.body.content,
            author: "Grantie"
        });
        await set(ref(db, "/lastMsg"), lastMsg + 1);
    });
});

app.listen(5000);