const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('OK'));
app.listen(5001, () => console.log('Minimal server running on 5001'));
