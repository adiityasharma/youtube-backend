import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname } = req.body;

  if (!fullname || !username || !email || !password) {
    throw new ApiError(400, "All field are required")
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage ? req.files?.coverImage[0]?.path : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  })

  const createdUser = await User.findById({ _id: user._id }).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "failed to register user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )
})