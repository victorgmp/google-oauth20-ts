import mongoose from 'mongoose';
// useCreateIndex: true,
// useFindAndModify: false,

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected');
  } catch {
    console.log('Error');
  }
}

export default connect;
