import User from "../models/User";
export default { getAll, getSingle, create };

async function getAll({ req, res }: { req: any; res: any }) {
  const users = await User.find();
  res.json(users);
}

async function getSingle({ req, res }: { req: any; res: any }) {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User nicht gefunden" });
    return;
  }
  res.json(user);
}

async function create({ req, res }: { req: any; res: any }) {
  const users = req.body;

  const savedUsers = [];

  for (const userData of users) {
    const newUser = new User({
      username: userData.username,
      password: userData.password,
    });

    const savedUser = await newUser.save();
    savedUsers.push(savedUser);
  }

  res.status(201).json(savedUsers);
}
