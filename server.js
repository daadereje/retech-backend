const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ReTech API is running...");
});

app.use("/api/repairs", require("./routes/repairs"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
