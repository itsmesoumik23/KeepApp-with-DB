const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// connect to mongoDB
mongoose.connect("mongodb+srv://admin-soumik:test123@cluster0.zp5oe.mongodb.net/newItemsDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

// Data Schema
const itemsSchema = {
    title: String, description: String
}

// Data Model
const Item = mongoose.model("Item", itemsSchema)

// Read route
app.get("/items", (req, res) => {
    Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err))
})

// Create route
app.post("/newItem", (req, res) => {
    const newItem = new Item({
        title: req.body.title, description: req.body.description
    })
    newItem.save()
    .then((item) => console.log(item))
    .catch((err) => req.status(400).json("Error: " + err))
})

// Update route
app.put("/put/:id", (req, res) => {
    const updatedItem = {
        title: req.body.title, description: req.body.description
    }
    Item.findByIdAndUpdate({_id: req.params.id}, {$set: updatedItem}, (req, res, err) => {
        if(!err){console.log("Updated");} else{console.log(err);}
    })
})

// Delete route
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    Item.findByIdAndRemove({_id: id}, (req, res, err) => {
        if (!err){
            console.log("Deleted");
        } else{
            console.log(err);
        }
    })
})


if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// listen
app.listen(process.env.PORT || 3001, function(){
    console.log("Express server running on port 3001");
})