import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app =express();
app.use (morgan('dev'));
app.use (express.json()) //Para recibir los datos por formato json se debe colocar esto
app.use('/api',authRoutes); //para hacer la rutas se le coloca de esta forma antes del authRoutes

export default app;
