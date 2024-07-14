const path = require("path");

const User = require(path.join(__dirname, "./../models/user.model"));
const AppError = require("../utils/appError");
const catchAsync = require(path.join(__dirname, "./../utils/catchAsync"));

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: "No user found !",
    });
  }
};

exports.updateMe = async (req, res, next) => {
  // 1️⃣) Create error if user POSTs password data as we had created a separate handler for that in the authController.js

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  // 2️⃣) Filtered out unwanted field names that are not allowed to be updated.
  const filteredBody = filterObj(req.body, "name", "email");

  // ---------- Lec_2 --------

  // Adding photo property to the filteredBody object from req.filename

  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  // 3️⃣) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};

exports.getUser = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: "No user found with that ID",
    });
  }
};

exports.updateUserSchema = catchAsync(async (req, res, next) => {
  // Extract the Cloudinary image URL from the request body
  const { cloudinaryImageUrl } = req.body;

  // Check if the Cloudinary image URL is provided
  if (!cloudinaryImageUrl) {
    return next(new AppError("Cloudinary image URL is required", 400));
  }

  try {
    // Update the user's cloudinaryImageUrl property
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { cloudinaryImageUrl },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: "No user found !",
    });
  }
};

