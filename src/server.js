require('dotenv').config();

import app from './app';

app.listen(process.env.HOST_LOCAL, () => {
  console.log(`Porta ${process.env.HOST_LOCAL} servidor ligado`);
});
