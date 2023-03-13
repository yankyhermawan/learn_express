import express from "express";
import mysql from "mysql";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = express();
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "login",
});
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));
app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Handle the login form submission
app.post("/main", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	// Validate the username and password
	if (username === "admin" && password === "password") {
		res
			.setHeader("Content-Type", "text/plain")
			.sendFile(path.join(__dirname, "main.html"));
	} else {
		res
			.status(401)
			.json({ success: false, message: "Invalid username or password" });
	}
});
// app.get("/login", (req, res) => {
// 	const filePath = path.join(__dirname, "index.html");
// 	res.sendFile(filePath);
// });

// app.get("/login", (req, res) => {
// 	console.log(req.body);
// 	const username = req.body.username;
// 	const password = req.body.password;
// 	console.log(username, password);
// 	db.query(
// 		"SELECT * FROM logindb WHERE username = ? AND password = ?",
// 		[username, password],
// 		(error, results, fields) => {
// 			console.log(results, typeof results);
// 			let string = Object.values(JSON.parse(JSON.stringify(results)));
// 			if (error) throw error;

// 			// Check if a record was found for the user
// 			if (username === string[0].username) {
// 				console.log(true);
// 				res.redirect("/main");
// 			} else {
// 				res.send("Invalid username or password");
// 			}
// 		}
// 	);
// });
app.get("/main", (req, res) => {
	const filePath = path.join(__dirname, "main.html");
	res.sendFile(filePath);
});
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
