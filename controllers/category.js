const mongoose = require("mongoose");
const Category = require("../models/category");

module.exports = {
  get_category_lists: (req, res) => {
    Category.find()
    //   .select("_id petName price petImages description quantity postedById")
      .then((docs) => {
        const response = {
          count: docs.length,
          category: docs.map((doc) => ({
            _id: doc._id,
            category: doc.category,
            request: {
              type: "GET",
              request: `${process.env.REQUEST_URI}:${process.env.PORT}/pets/${doc._id}`,
            },
          })),
        };
        res.status(200).json(response);
      })
      .catch((err) => res.status.json({ error: err }));
  },
  get_pet_detail: (req, res) => {
    const id = req.params.petId;
    Pet.findById(id)
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({
            message: "Not Found petId",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    // res.status(200).json({
    //     message: 'Handling Get request to /pets/:petId',
    //     id: id
    // })
  },
  post_category: (req, res) => {
    // const pet = {
    //     petName: req.body.petName,
    //     price: req.body.price
    // }

    // const imageFiles = req.files.map((file) => ({
    //   originalname: file.originalname,
    //   path: `${process.env.REQUEST_URI}:${process.env.PORT}/${file.path}`,
    // }));
    const category = new Category({
      _id: mongoose.Types.ObjectId(),
      category: req.body.category,
    });
    category
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Handling Post request to /category",
          createdPet: result,
        });
      })
      .catch((err) =>
        res.status(500).json({
          error: err,
          message: "post error",
        })
      );
  },
  delete_posted_pet: (req, res) => {
    const id = req.params.petId;
    Pet.remove({ _id: id })
      .then((result) => {
        res.status(200).json({
          message: "pet deleted",
          result: result,
        });
      })
      .catch((err) =>
        res.status(500).json({
          error: err,
          message: "delete error",
        })
      );
  },
  delete_all_post: (req, res) => {
    Pet.remove()
      .then((result) => {
        res.status(200).json({
          message: "pet deleted",
          result: result,
        });
      })
      .catch((err) =>
        res.status(500).json({
          error: err,
          message: "delete error",
        })
      );
  },
  update_posted_pet: (req, res) => {
    
      petId = req.params.petId;
      const imageFiles = req.files.map((file) => ({
        originalname: file.originalname,
        path: `${process.env.REQUEST_URI}:${process.env.PORT}/${file.path}`,
      }));
      // console.log(req.body)
      const {petName, price, description, quantity} = req.body
        Pet.findByIdAndUpdate({ _id: petId}, {petName, price, petImages: imageFiles, description, quantity}, {new: true})
        .then((result) => {
          res.status(200).json({
            result: result,
            message: "it works"
          })
        })
        .catch((err) => res.json(err));
    }
};
