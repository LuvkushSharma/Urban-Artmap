const path = require("path");
const redis = require('redis');

const User = require(path.join(__dirname, "./../models/user.model"));
const Otp = require(path.join(__dirname, "./../models/otp.model"));

const AppError = require("../utils/appError");
const catchAsync = require(path.join(__dirname, "./../utils/catchAsync"));
const Email = require(path.join(__dirname, "./../utils/email"));
const crypto = require('crypto');

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


exports.updateNameEmail = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new AppError("Name and email are required", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
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
});

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


// ---------- OTP Controller Functions Using Redis ----------

/*

const redisClient = redis.createClient();

exports.generateOtpAndSendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const name = user ? user.name : null;
  
  redisClient.on('error', err => console.log('Redis Client Error', err));
  await redisClient.connect();

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    const otpData = {
      email,
      otp,
      name
    };
    
    // Store OTP in Redis with a TTL of 10 minutes
    await redisClient.set('otp', JSON.stringify(otp), 'EX', 600);

    // Send OTP email
    await new Email(otpData).sendOtp();

    console.log('OTP sent to email:', email);
    
    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.validateOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {

    // Retrieve the OTP from Redis
    const storedOtp = await redisClient.get('otp');
    
    // OTP is valid
    if (storedOtp === otp) {
      
      // Delete the OTP from Redis
      redisClient.del('otp');
      res.status(200).json({ message: 'OTP validated successfully' });

    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to validate OTP' });
  }
};

*/


// ---------- OTP Controller Functions Using MongoDB ----------

exports.generateOtpAndSendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const name = user ? user.name : null;
  
  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP expiration time (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Store OTP in the database
    await Otp.create({ email, otp, expiresAt });

    const otpData = {
      email,
      otp,
      name
    };
    
    // Send OTP email
    await new Email(otpData).sendOtp();

    console.log('OTP sent to email:', email);
    
    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.validateOtp = async (req, res) => {

  console.log('Request:', req.body);
  
  const { otp } = req.body;
  const email = req.user.email;

  console.log('Email:', email);

  const data = {
    email,
    otp
  };

  try {
    // Retrieve the OTP from the database
    const otpRecord = await Otp.findOne(data);

    if (otpRecord) {
      // Check if the OTP has expired
      if (otpRecord.expiresAt > Date.now()) {
        // OTP is valid, delete it from the database
        await Otp.deleteOne({ email, otp });
        res.status(200).json({ message: 'OTP validated successfully' });
      } else {
        res.status(400).json({ error: 'OTP has expired' });
      }
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to validate OTP' });
  }
};