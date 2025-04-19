const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/api/rank", async (req, res) => {
  try {
    const region = "eu";
    const name = "kebab%20enjoyer";
    const tag = "EzWin";

    const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}`);
    const data = await response.json();

    if (data.status !== 200) {
      return res.send("Impossible de récupérer le rang.");
    }

    const tier = data.data.currenttierpatched;
    const rr = data.data.ranking_in_tier;

    res.send(`Rang actuel : ${tier} | ${rr} RR`);
  } catch (err) {
    res.send("Erreur lors de la récupération du rang.");
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});
