import mongoose from 'mongoose';

const username = 'admin';
const password = 'admin';
const percentEncodedUsername = encodeURIComponent(username);
const percentEncodedPassword = encodeURIComponent(password);
console.log(percentEncodedUsername, percentEncodedPassword);

const connectToMongo = async () => {
  // const client = await mongoose.createConnection(`mongodb://${percentEncodedUsername}:${percentEncodedPassword}@localhost:27017/profiles-db`);
  const client = await mongoose.connect('mongodb://localhost:27017/profiles-db', {
    auth: {
      username,
      password,
    },
    authSource: 'admin',
  });
  return client;
};

export { connectToMongo };

