const path = require("path");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const User = require(path.join(__dirname, "/../models/user.model"));
const catchAsync = require(path.join(__dirname, "/../utils/catchAsync"));
const AppError = require(path.join(__dirname, "./../utils/appError"));
const Email = require(path.join(__dirname, "./../utils/email"));

const { randomInt } = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    domain: ".localhost",
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Creating a new User
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo,
    role: req.body.role,

  });

  const url = `http://localhost:5173/profile`;

  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // Using ES6 destructuring
  const { email, password } = req.body;

  // 1️⃣ Check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password! 💥", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
  res.clearCookie('jwt', {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'none'
  }).status(204).json({ status: 'success' });
};



exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // their is no token
  if (!token) {
    return next(
      new AppError("You are not loggen in! Please login to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does not longer exists.",
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies?.jwt) {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies?.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return res
          .status(401)
          .json({ success: false, message: "Password changed" });
      }

      // Set user in res.locals
      // res.locals.user = currentUser;
      return res.status(200).json({ success: true });
    } else {
      // User is not logged in
      return res
        .status(401)
        .json({ success: false, message: "User is not logged in" });
    }
  } catch (error) {
    // Internal server error
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You donot have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1️⃣ ) Get user based on Posted email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }

    // 2️⃣ ) Generate the random reset token
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    try {
      // 3️⃣ ) Send it to user's email
      const resetURL = `http://localhost:4000/resetPassword/${resetToken}`;

      // --------- Lec_10 ----------
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Token send to email",
      });
    } catch (err) {
      (User.createPasswordResetToken = undefined),
        (user.passwordResetExpires = undefined);

      await user.save({ validateBeforeSave: false });

      return next(
        new AppError("There was an error sending the email. Try again later!"),
        500
      );
    }
  } catch {
    res.status(404).json({
      status: "fail",
      message: "Try again to reset the password !",
    });
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {

  console.log("req.params : ",req.params.token);
  
  // 1️⃣) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");

  // 2️⃣) If token has not expired, and there is user, set the new password

  // No user exists
  if (!user) {
    return next(new AppError("Token is invalid or has expired"), 400);
  }

  // 3) Check if oldPassword matches with the password stored in the database
  const isPasswordCorrect = await user.correctPassword(
    req.body.oldPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    return next(new AppError("Old password is incorrect", 400));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.confirmPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

exports.contactUs = catchAsync(async (req, res, next) => {
  const firstName = req.body.name.split(" ")[0];

  const userDetails = {
    name: firstName,
    message: req.body.message,
  };

  await new Email(userDetails).sendIssues();
});

