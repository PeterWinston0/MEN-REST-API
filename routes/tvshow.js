const router = require("express").Router();
const { request } = require("express");
const product = require("../models/tvshow");
const { verifyToken } = require("../validation");

//CRUD operations

// Create TV-Show - post 
router.post("/", verifyToken, (req, res) => {
    data = req.body;
    product.insertMany(data)
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send( { message: err.message }); })
});

// /api/TV-Shows/
// Read all TV-Shows - get
router.get("/", (req, res) => {
    product.find()
    .then(data => {res.send(mapArray(data)); })
    .catch(err => 
        {res.status(500).send( { message: err.message }); 
    })
});

// Read random products - get
router.get("/random", (req, res) => {
    product.find()
    .then(data => {
        let randomShow = Math.floor(Math.random() * data.length);
        res.send(data[randomShow]);
     })
    .catch(err =>
        {res.status(500).send( { message: err.message });
    })
  });

// Read specific TV-Show - get
router.get("/:id", (req, res) => {
    product.findById(req.params.id)
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send( { message: err.message }); })
});

// Update specific TV-Show - put
router.put("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    product.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data)
        {
            res.status(404).send({message: "Cannot update product with id=" + id + ". Maybe product was not found!"})
        }
        else{
            res.send({ message: "Product was succesfully updated."})
        }
    })
    .catch(err => {res.status(500).send( { message: "Error updating product with id=" + id }); })
});

// Delete specific TV-Show - delete
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    product.findByIdAndDelete(id)
    .then(data => {
        if (!data)
        {
            res.status(404).send({message: "Cannot delete product with id=" + id + ". Maybe product was not found!"})
        }
        else{
            res.send({ message: "Product was succesfully deleted."})
        }
    })
    .catch(err => {res.status(500).send( { message: "Error deleting product with id=" + id }); })
});

function mapArray(inputArray) {
    
    // do something with inputArray

    let outputArray = inputArray.map(element => (
        {
            id: element._id,
            name: element.name,
            description: element.description,
            seasons: element.seasons,
            actors: element.actors,
            image: element.image,

            // add uri for this specific resource
            uri: "/api/tvshow/" + element._id
        }
        
    ));
    
    return outputArray;
}

module.exports = router;
