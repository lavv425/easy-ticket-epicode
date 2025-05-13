import './config/dotenv.js';
import express from 'express';
import { CORS_CONFIG, RATE_LIMITER_CONFIG } from './config/express.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { API_NAMESPACE } from './constants/routes/namespaces.js';
import apiRouter from './routes/api.js';


const app = express();
app.use(express.json());
app.use(cors(CORS_CONFIG));
app.use(rateLimit(RATE_LIMITER_CONFIG));
app.use(helmet());

app.use(API_NAMESPACE, apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});