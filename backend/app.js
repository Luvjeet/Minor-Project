import express, { urlencoded, json } from "express";
import { set, connect } from "mongoose";
import chalk from "chalk";
import User from "./models/user.js";
import Admin from "./models/admin.js";
import Party from "./models/parties.js";

const app = express();
const voted = [];
set("strictQuery", true);
connect(
  "mongodb+srv://luvjeet1402:loveU%401402@personaldb.1z0wbx4.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log(chalk.yellow("MongoDB Server Connected!")))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,AUthorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.post("/", async (req, res) => {
  const { addharNumber } = req.body;
  const voter = await voted.find((adar) => adar === addharNumber);
  if (voter) return res.status(200).send({ message: "Already Voted" });
  console.log(voter);
  if (!addharNumber) return res.status(400).send({ message: "Error" });
  const result = await User.findOne({ addharNumber: addharNumber });
  voted.push(addharNumber);
  if (!result) return res.status(400).send({ message: "Error" });
  return res.status(200).send({ message: "Success", result: result });
});
console.log(voted);

app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email, password: password });
  if (!admin) return res.send({ message: "Error", error: "No Admin Found" });
  return res.send({ message: "Success", result: admin });
});

app.get("/parties", async (req, res) => {
  const parties = await Party.find();
  if (!parties) return res.send({ message: "Error" });
  return res.send({ message: "Success", result: parties });
});

app.post("/parties/vote", async (req, res) => {
  const party = await Party.findOneAndUpdate(
    { _id: req.body.id },
    { $inc: { vote: 1 } }
  );
  if (!party) return res.send({ message: "Error" });
  return res.send({ message: "Success" });
});

// app.post("/", async (req, res) => {
//   const { addharNumber, name } = req.body;
//   const result = await User.create({ addharNumber: addharNumber, name: name });
//   return res.send(result);
// });

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.yellow("The server is runing on port 5000"));
});
