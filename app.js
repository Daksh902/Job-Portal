const express = require('express');
const session = require('express-session');
const path = require('path');
const mainRouter = require('./routes/mainRouter.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// Use middleware
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const fileUploadMiddleware = require('./middleware/fileUploadMiddleware');
const confirmationMiddleware = require('./middleware/confirmationMiddleware');
const validationMiddleware = require('./middleware/validationMiddleware');

app.use(session({ secret: '1-1secret-key', resave: true, saveUninitialized: true }));
app.use(authenticationMiddleware);
app.use(fileUploadMiddleware);
app.use(confirmationMiddleware);
app.use(validationMiddleware);

// Use routers
app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
