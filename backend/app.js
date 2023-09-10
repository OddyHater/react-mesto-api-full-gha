const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { errors } = require('celebrate');
const { loginValidation, createUserValidation } = require('./middlewares/validation');

const { requestLogger, errorLogger } = require('./middlewares/loggers');

const userRoutes = require('./routes/users');
const cardRouter = require('./routes/cards');

const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(express.json());
app.use(requestLogger);

app.use('/404', (req, res, next) => {
  res.status(404).send({ message: 'Страница не найдена' });

  next();
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRouter);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(PORT, 'im working');
});
