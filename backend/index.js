
// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(express.json());
// app.use(cors());


// // ================= DATABASE =================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ================= TEST API =================
// app.get("/", (req, res) => {
//   res.send("Express is running");
// });



// // const uploadDir = path.join(__dirname, "upload/images");
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir, { recursive: true });
// // }


// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(
// //       null,
// //       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
// //     );
// //   },
// // });

// // const upload = multer({ storage });



// //? render.com version  
// // app.use("/images", express.static(uploadDir));
// // app.post("/upload", upload.single("product"), (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ success: 0, message: "No file uploaded" });
// //   }

// //   const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

// //   res.json({
// //     success: 1,
// //     image_url: imageUrl,
// //   });
// // });
// //?







// //!  Image Storage Engine
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// // const upload = multer({ storage: storage });



// //!  Createing Upload Endpoint for images


// // app.use("/images", express.static("upload/images"));
// // import upload from "./middleware/upload.js";

// // app.post("/upload", upload.single("product"), (req, res) => {
// //   if (!req.file) {
// //     return res
// //       .status(400)
// //       .json({ success: 0, message: "No file uploaded" });
// //   }

// //   res.json({
// //     success: 1,
// //     image_url: req.file.path,        // ✅ Cloudinary CDN URL
// //     public_id: req.file.filename,    // for delete later
// //   });
// // });

// //! Schema for Creating Products

// const Product = mongoose.model("Product", {
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },

//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number,
//     required: true,
//   },
//   old_price: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   },
// });

// // app.post("/addproduct", async (req, res) => {
// //   let products = await Product.find({});
// //   let id;
// //   if (products.length > 0) {
// //     let last_product_array = products.slice(-1);
// //     let last_product = last_product_array[0];
// //     id = last_product.id + 1;
// //   } else {
// //     id = 1;
// //   }

// //   const product = new Product({
// //     id: id,
// //     name: req.body.name,
// //     image: req.body.image,
// //     category: req.body.category,
// //     new_price: req.body.new_price,
// //     old_price: req.body.old_price,
// //   });

// //   console.log(product);
// //   await product.save();
// //   console.log("Saved");

// //   res.json({
// //     success: true,
// //     name: req.body.name,
// //   });
// // });



// //!  Creating Api for deleting Products

// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({
//     success: true,
//     name: req.body.name,
//   });
// });

// //!  Creating Api for getting all Products

// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All Products Fetched");
//   res.send(products);
// });

// //! Creating Api for getting all Users

// app.get("/users",async (req,res)=>{
//   let users = await Users.find({})
//   console.log("All Users Fetched")
//   res.send(users)
// })


// //! Schema creating for User Model

// const Users = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   cartData: {
//     type: Object,
//   },
//   data: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Creating Endpoint for  registering the user

// app.post("/signup", async (req, res) => {
//   let check = await Users.findOne({ email: req.body.email });
//   if (check) {
//     return res.status(400).json({
//       success: false,
//       errors: "existing user found with same email address",
//     });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }

//   const user = new Users({
//     name: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });
//   await user.save();

//   const data = {
//     user: {
//       id: user.id,
//     },
//   };
//   const token = jwt.sign(data, "secret_ecom");
//   res.json({ success: true, token });
// });

// //creating endpoint for user login

// app.post("/login", async (req, res) => {
//   let user = await Users.findOne({ email: req.body.email });
//   if (user) {
//     const passCompare = req.body.password === user.password;
//     // console.log("check")
//     if (passCompare) {
//       const data = {
//         user: {
//           id: user._id,
//         },
//       };
//       const token = jwt.sign(data, "secret_ecom");
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, errors: "Wrong Password" });
//     }
//   } else {
//     res.json({ success: false, errors: "Wrong Email Id" });
//   }
// });

// // creating endpoint for newcollection data
// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let newcollection = products.slice(1).slice(-8);
//   console.log("NewCollection Fetched");
//   res.send(newcollection);
// });

// // creating endpoint for popular in women section

// app.get("/popularinwomen", async (req, res) => {
//   let products = await Product.find({ category: "women" });
//   let popular_in_women = products.slice(0, 4);
//   console.log("Popular in women Fetched");
//   res.send(popular_in_women);
// });



// // creating endpoint for popular in men section



// app.get("/popularinmen", async (req, res) => {
//   let products = await Product.find({ category: "men" });
//   let popular_in_men = products.slice(0, 4);
//   console.log("Popular in men Fetched");
//   res.send(popular_in_men);
// });





// // creating endpoint for popular in kids section


// app.get("/popularinkids", async (req, res) => {
//   let products = await Product.find({ category: "kid" });
//   let popular_in_kids = products.slice(0, 4);
//   console.log("Popular in kids Fetched");
//   res.send(popular_in_kids);
// });






// //creating middleware to fetch user  


// const fetchUser = async (req,res,next)=>{
//   const token = req.header('auth-token')
//   if(!token){
//     res.status(401).send({errors:"Please authenticate using valid token"})
//   }else{
//     try {
//       const data = jwt.verify(token,'secret_ecom')
//       req.user = data.user;
//       next()
//     } catch (error) {

//       res.status(401).send({errors:"Please authenticate using a valid token"})

//     }
//   }
// }


// // creating endpoint for adding products in cartdata

// app.post("/addtocart",fetchUser, async (req, res) => {
//   console.log("Added",req.body.itemId)
//   // console.log(req.body,req.user);
//   let userData = await Users.findOne({_id:req.user.id})
//   userData.cartData[req.body.itemId] += 1
//   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
// res.json({success:true,message:"Item Added"})
// // res.send('Added')
// });





// // creating endpoint to remove product from cardData

// app.post('/removefromcart',fetchUser,async(req,res)=>{
//   console.log("remove",req.body.itemId)
//   let userData = await Users.findOne({_id:req.user.id})
//   if( userData.cartData[req.body.itemId]>0)
//   userData.cartData[req.body.itemId] -= 1
//   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
// res.json({success:true,message:"Item removed"})
// })

// //creating endpoint to get cartdata 
// app.post('/getcart',fetchUser,async(req,res)=>{
//   console.log("GetCart")
//   let userData = await Users.findOne({_id:req.user.id})
//   res.json(userData.cartData)


// })





// // ================= CLOUDINARY UPLOAD =================
// const upload = require("./middleware/upload"); // ✅ only cloudinary

// app.post("/upload", upload.single("product"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false });
//   }

//   res.json({
//     success: true,
//     image_url: req.file.path,      // ✅ Cloudinary URL
//     public_id: req.file.filename,
//   });
// });


// // // ================= PRODUCT MODEL =================
// // const Product = mongoose.model("Product", {
// //   id: Number,
// //   name: String,
// //   image: String,
// //   category: String,
// //   new_price: Number,
// //   old_price: Number,
// //   date: { type: Date, default: Date.now },
// //   available: { type: Boolean, default: true },
// // });


// // ================= ADD PRODUCT =================
// app.post("/addproduct", async (req, res) => {
//   const products = await Product.find({});
//   const id = products.length ? products[products.length - 1].id + 1 : 1;

//   const product = new Product({
//     id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });

//   await product.save();
//   res.json({ success: true });
// });


// // ================= GET PRODUCTS =================
// app.get("/allproducts", async (req, res) => {
//   const products = await Product.find({});
//   res.json(products);
// });


// // // ================= USER MODEL =================
// // const Users = mongoose.model("Users", {
// //   name: String,
// //   email: { type: String, unique: true },
// //   password: String,
// //   cartData: Object,
// //   date: { type: Date, default: Date.now },
// // });


// // // ================= AUTH =================
// // app.post("/signup", async (req, res) => {
// //   const check = await Users.findOne({ email: req.body.email });
// //   if (check) return res.status(400).json({ success: false });

// //   let cart = {};
// //   for (let i = 0; i < 300; i++) cart[i] = 0;

// //   const user = new Users({
// //     name: req.body.username,
// //     email: req.body.email,
// //     password: req.body.password,
// //     cartData: cart,
// //   });

// //   await user.save();
// //   const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
// //   res.json({ success: true, token });
// // });


// // ================= SERVER =================
// app.listen(port, () => {
//   console.log("Server running on port " + port);
// });





const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());


// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Express is running");
});


// ================= CLOUDINARY UPLOAD =================
const upload = require("./middleware/upload");

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false });
  }

  res.json({
    success: true,
    image_url: req.file.path,
    public_id: req.file.filename,
  });
});


// ================= PRODUCT MODEL =================
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});


// ================= ADD PRODUCT =================
app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true });
});


// ================= REMOVE PRODUCT =================
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});


// ================= GET PRODUCTS =================
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


// ================= COLLECTIONS =================
app.get("/newcollections", async (req, res) => {
  const products = await Product.find({});
  res.json(products.slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  res.json(await Product.find({ category: "women" }).limit(4));
});

app.get("/popularinmen", async (req, res) => {
  res.json(await Product.find({ category: "men" }).limit(4));
});

app.get("/popularinkids", async (req, res) => {
  res.json(await Product.find({ category: "kid" }).limit(4));
});


// ================= USER MODEL =================
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});


// ================= AUTH =================
app.post("/signup", async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, message: "User exists" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});


// ================= AUTH MIDDLEWARE =================
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};


// ================= CART =================
app.post("/addtocart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.json({ success: true });
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) {
    user.cartData[req.body.itemId] -= 1;
  }
  await user.save();
  res.json({ success: true });
});

app.post("/getcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user.cartData);
});

// ================= USER INFO =================
app.get("/getuser", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, name: user.name });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================= CLEAR CART (After Payment) =================
app.post("/clearcart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Clear all cart items
    user.cartData = {};
    await user.save();

    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= USERS =================
app.get("/users", async (req, res) => {
  res.json(await Users.find({}));
});


// ================= SERVER =================
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
