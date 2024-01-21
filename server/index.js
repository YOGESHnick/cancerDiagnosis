const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(
	session({
	  secret: 'your-secret-key',
	  resave: false,
	  saveUninitialized: true,
	});
);

/// L O G I N   H A N D L E R 
app.use("/api/auth", authRoute);

app.use(
	cors({
		origin: "http://localhost:3000",
		// origin: "https://campus-connect-jd7p.onrender.com",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	});
);

app.listen(8080, ()=>{
    console.log("Server started at port 8080");
});
