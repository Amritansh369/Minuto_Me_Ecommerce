// Owner: M1
import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('-'.repeat(50));
    console.log(`Server running at PORT : ${PORT} and Database connection Successfull`);
    console.log('-'.repeat(50));
  });
});
