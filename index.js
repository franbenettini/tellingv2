import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const API_KEY = "6ZRXUi422gDRjY8QJHQlvgmi0skgqgVwgIKmJQ-hyRU";
const NEWS_API_URL = "https://api.newscatcherapi.com/v2/latest_headlines";

app.get('/news', (req, res) => {
    axios.get(NEWS_API_URL, {
        headers: {
            'x-api-key': API_KEY
        },
        params: {
            countries: 'ar',
            not_countries: 'mx',
            ranked_only: true,
        }
    })
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.toString() })
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
