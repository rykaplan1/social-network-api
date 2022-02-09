const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomArrItem, getRandomUsername, getRandomThought, generateEmail } = require('./data');

connection.on('error', (err) => err);
connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];
  let thoughts = [];

  for (let i = 0; i < 50; i++) {
    const username = getRandomUsername();
    const email = generateEmail(username);

    users.push({username, email});

    for (let i = 0; i < 5; i++) {
      const thought = getRandomThought();
      thoughts.push({thought, username});
    }
  }

  const usernames = users.map((user) => user.username);
  thoughts = thoughts.map((thought) => {
    const reactions = [];
    for (let i = 0; i < 5; i++) {
      const username = getRandomArrItem(usernames);
      const choice = Math.floor(Math.random() * 2);
      let reactionBody = "";
      if (choice === 0) {
        reactionBody = getRandomThought()
      }
      reactions.push({reactionBody, username});
    }

    thought.reactions = reactions;

    return thought;
  });

  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});