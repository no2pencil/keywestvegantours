const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
<html>
  <head>
    <title>Key West Vegan Tours</title>
  </head>
  <body>
    <h2>Welcome to Key West Vegan Tours</h2>
    <p>More to come soon...</p>
  </body>
</html>
<!-- Adding comment for push -->
`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost${PORT}`);
});
