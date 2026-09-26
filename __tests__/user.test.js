import mongoose        from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../src/models/user.model.js';

let mongoServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
};



export const clearCollections = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

beforeAll(async () => await connect());
afterAll(async  () => await disconnect());
afterEach(async () => await clearCollections());


describe('User Model Test ', () => {
  it('should create a user', async () => {
    const user = await User.create({name: 'test', email: 'test', password: 'test'});
    expect(user.name).toBe('test');
    expect(user.email).toBe('test');
    expect(user.password).toBe('test');
  });

  it('should find a user', async () => {
    const user = await User.create({name: 'test', email: 'test', password: 'test'});
    const foundUser = await User.findById(user._id);
    expect(foundUser.name).toBe('test');
    expect(foundUser.email).toBe('test');
    expect(foundUser.password).toBe('test');
  });
  
})