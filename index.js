const express = require("express");

const app = express();

const PORT = 8081;
 
app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        message: "Server is up and running :)",
        data: "Hey"
    });
});

app.get("*",(req,res) => {
    res.status(404).json({
        message: "This route does not exists",
    });
});

app.listen(PORT, () => {
    console.log('Server is running at port ${PORT}');
});