import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import { handleWebhook } from './webhook/handleWebhook';
import session from 'express-session';
import passport from 'passport';
import { passportHelper } from './helpers/passportHelper';
const app = express();

//morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

app.post('/api/webhook',express.raw({'type':'application/json'}),handleWebhook)
//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "sharifSecret", resave: false, saveUninitialized: true }));
passportHelper.initializePassport()
//file retrieve
app.use(express.static('uploads'));

//router
app.use('/api/v1', router);

//live response
app.get('/', (req: Request, res: Response) => {
  const date = new Date(Date.now());
  res.send(
    `<h1 style="text-align:center; color:#173616; font-family:Verdana;">Beep-beep! The server is alive and kicking.</h1>
    <p style="text-align:center; color:#173616; font-family:Verdana;">${date}</p>
    `
  );
});

//global error handle
app.use(globalErrorHandler);

//handle not found route;
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
