import express from "express";
import fs from "fs/promises";
import path from "path";
import process from "process";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import { ObjectId } from "mongodb";

import { flattenString, replaceVariables } from "./utils/index.js";

dotenv.config()

const MONGO_URI = 'mongodb+srv://albert:albert26102003@cluster1.ecre7jl.mongodb.net/?retryWrites=true&w=majority';
const RAPID_KEY = '4d4977c6a6msh6d9c810069af1e7p169127jsne6d4a4bc2ee9';
const RAPID_HOST = 'judge0-ce.p.rapidapi.com';

const clearModule = (code) => {
  const regex = /(import|export).*?;|console.log\(.*?;|\/\/.*?;|\/\*.*\*\//g;

  return code.replaceAll(regex, "");
};

const getPlainCalculatorCode = async (code) => {
  const validator = await fs.readFile(
    path.resolve(process.cwd(), "validator.js"),
    "utf-8"
  );
  const calculator = await fs.readFile(
    path.resolve(process.cwd(), "calculator.js"),
    "utf-8"
  );

  const validatorClean = clearModule(validator);
  const calculatorClean = clearModule(calculator);
  const filteredExpression = replaceVariables(code);

  return (
    validatorClean + calculatorClean + `\nconsole.log(calculator("${filteredExpression}"));`
  );
};

async function init() {
  const client = new MongoClient(MONGO_URI);
  const database = client.db("sample_mflix");
  const codeCollection = database.collection("code");

  const app = express();

  app.use(cors({ origin: '*', credentials: true }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/submit", async (req, res) => {
    const expr = req.body.code;

    try {
      const code = await getPlainCalculatorCode(expr);
  
      const result = await axios.post(
        `https://${RAPID_HOST}/submissions/?wait=true`,
        {
          source_code: code,
          language_id: 93,
        },
        {
          headers: {
            "X-RapidAPI-Key": RAPID_KEY,
            "X-RapidAPI-Host": RAPID_HOST,
          },
        }
      );
  
      res.status(200);
      res.send(result.data);
    } catch (error) {
      res
        .status(200)
        .json({ stderr: error.message })
    }
  });

  app.get("/code", async (req, res) => {
    const result = await codeCollection.find({}).toArray();

    res.status(200);
    res.send(result);
  });

  app.post("/code", async (req, res) => {
    const { code, name } = req.body;

    await codeCollection.insertOne({ code, name, createdOn: new Date() });

    console.log(`created Code: {${code}, ${name}}`);

    res.status(201);
    res.send("created");
  });

  app.put("/code/:id", async (req, res) => {
    const { code, name } = req.body;

    const _id = new ObjectId(req.params.id)

    const result = await codeCollection.updateOne(
      { _id }, 
      { $set: { code, name } },
    );

    console.log(result)

    console.log(`Updated Code: {${code}, ${name}}`);

    res.status(200);
    res.send(result);
  });

  app.delete("/code/:id", async (req, res) => {
    const _id = new ObjectId(req.params.id)

    await codeCollection.deleteOne({ _id });

    console.log(`Deleted Code with id: ${req.params.id}`);

    res.status(200);
    res.send('deleted');
  });

  app.listen(8000);
}

init();
//CRUD code saving, editing, loading, name of code piece
