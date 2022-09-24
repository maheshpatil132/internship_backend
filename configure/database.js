const mongoose = require('mongoose');

const connectDatabase = (app, PORT) => {
    mongoose.connect(`${process.env.MONGO_URL}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        app.listen(PORT, () => {
            console.log(`server is listening....${PORT} `);
        })
    }).catch(err => {
        console.log(err.message);
    })
}

module.exports = connectDatabase