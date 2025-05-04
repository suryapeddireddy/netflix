import connectDB from "./utils/db.js";
import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to DB');
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to DB');
    console.error(error);
  });
