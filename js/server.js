
const express = require('express');
const cors = require('cors');
const deepl = require('deepl-node');
const app = express();
const port = 3000;

// Replace with your DeepL API key
const authKey = "1976e71f-a20f-43c6-93f3-80845daf975b:fx";

const translator = new deepl.Translator(authKey);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Dare for the future!');
});

app.get('/translate', (req, res) => {
    const { text, targetLang } = req.query;
    console.log(`Text: ${text}, Target Language: ${targetLang}`);
    translator.translateText(text, null, targetLang)
        .then((result) => {
            res.json({ text: result.text });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error.message || "Internal Server Error" });
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
