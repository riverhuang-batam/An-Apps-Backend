const mongoose = require("mongoose");
const Article = require("../models/article");

module.exports = {
  get_article_lists: (req, res) => {
    Article.find()
    //   .select("_id petName price petImages description quantity postedById")
      .then((docs) => {
        const response = {
          count: docs.length,
          article: docs.map((doc) => ({
            _id: doc._id,
            title: doc.title,
            articleImages: doc.articleImages,
            description: doc.description,
            postedById: doc.postedById,
            request: {
              type: "GET",
              request: `${process.env.REQUEST_URI}:${process.env.PORT}/article/${doc._id}`,
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
            message: "Not Found articleId",
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
  post_article: (req, res) => {
    // const pet = {
    //     petName: req.body.petName,
    //     price: req.body.price
    // }

    const imageFiles = req.files.map((file) => ({
      originalname: file.originalname,
      path: `${process.env.REQUEST_URI}:${process.env.PORT}/${file.path}`,
    }));
    const article = new Article({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      articleImages: req.body.articleImages,
      description: req.body.description,
      postedById: req.body.postedById,
    //   create_at: req.body.create_at,
    });
    article
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Handling Post request to /article",
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
          message: "article deleted",
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
          message: "article deleted",
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
//   update_posted_pet: (req, res) => {
    
//       petId = req.params.petId;
//       const imageFiles = req.files.map((file) => ({
//         originalname: file.originalname,
//         path: `${process.env.REQUEST_URI}:${process.env.PORT}/${file.path}`,
//       }));
//       // console.log(req.body)
//       const {petName, price, description, quantity} = req.body
//         Pet.findByIdAndUpdate({ _id: petId}, {petName, price, petImages: imageFiles, description, quantity}, {new: true})
//         .then((result) => {
//           res.status(200).json({
//             result: result,
//             message: "it works"
//           })
//         })
//         .catch((err) => res.json(err));
//     }
};
