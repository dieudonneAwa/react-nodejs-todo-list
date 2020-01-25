import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));
