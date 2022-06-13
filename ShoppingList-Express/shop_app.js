const express = require("express")
const app = express();
const itemsRoutes = require("./route/items");
const ExpressError = rquire("./expressError");

app.use(express.json());
app.use("/items", itemsRoutes);

/** create error handler 404 */

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404)

});

app.use( (req, res, next) => {
    res.status(err.status || 500);
    return res.josn({
        error: err.message
    });
});

module.exports = shop_app