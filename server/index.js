const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());

app.use(
	session({
	  secret: 'your-secret-key',
	  resave: false,
	  saveUninitialized: true,
	})
);


app.use(
	cors({
		origin: "http://localhost:3000",
		// origin: "https://campus-connect-jd7p.onrender.com",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

/// L O G I N   H A N D L E R 
app.use("/api/auth", authRoute);


mongoose.connect(
	"mongodb://shamlinlearning:zJuHgQMxwcKWlB8B@ac-08dhk2y-shard-00-00.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-01.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-02.n6hxill.mongodb.net:27017/cancer?ssl=true&replicaSet=atlas-pww4uv-shard-0&authSource=admin&retryWrites=true&w=majority"
    // { useNewUrlParser:true,useUnifiedTopology:true}
    ).then(console.log("Connected to MongoDB !")
);

app.listen(8080, ()=>{
    console.log("Server started at port 8080");
});
