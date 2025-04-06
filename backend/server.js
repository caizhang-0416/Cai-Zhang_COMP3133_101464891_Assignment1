require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const mongoose = require("mongoose");
const cors = require("cors");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.mjs").default;

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");


const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(
  "/graphql",
  graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 1}),
  (req, res, next) => {
    if(req.headers['content-type'].startsWith('multipart/form-data;')) {
      req.headers['content-type'] = 'application/json';
    }
    next();
},
  createHandler({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.use("/uploads", express.static("uploads", {
  setHeaders: (res, path) => {
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Content-Type", 'image/png');
  },
}));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
