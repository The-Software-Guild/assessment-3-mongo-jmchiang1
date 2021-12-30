// import User from "../models/usersModel.js";
// import asyncHandler from "express-async-handler";

// //getUsers function to get all users
// // export const getUsers = asyncHandler(async (req, res, next) => {
// //   const users = await User.find({});
// //   res.json(users);
// // });

// //getUserById function to retrieve user by id
// export const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

// //update existing user by id
// export const updateUserById = asyncHandler(async (req, res, next) => {
//     const id = await User.findById(req.params.id);
// })

// export const createNewUser= asyncHandler(async (req, res, next) => {
//     const newUser = new User(req.body);
//     newUser.save(err => {
//         if (err) return res.status(500).send(err);
//         return res.status(200).send(newUser);
//     })
// })

// export const deleteUserByID = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;


// })

//   //if user id match param id send user else throw error
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//     res.status(404);
//     throw new Error("User not found");
//   }
// });
