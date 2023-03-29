import express from "express";
import mysql from "mysql";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";

const app = express();
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "login",
});
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
	res.redirect("./login");
});

app.get("/login", (req, res) => {
	const filePath = path.join(__dirname, "index.html");
	res.sendFile(filePath);
});

app.route("/public/main").post((req, res) => {
	const name = req.body.username;
	const pass = req.body.password;
	const query = `SELECT * FROM logindb WHERE username = '${name}' AND password = '${pass}'`;
	db.query(query, (error, results, fields) => {
		console.log(name, pass);
		if (error) {
			console.log("Error");
		} else {
			const filePath = path.join(__dirname, "main.html");
			res.sendFile(filePath);
		}
	});
});
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
