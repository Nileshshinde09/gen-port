import { ApiResponse, ApiError, asyncHandler } from "../utils/index.js";

const getImageById = asyncHandler(async (req, res) => {
    const imageId = req.params.imageId;
    if(!imageId) throw new ApiError(400, "Image ID is required");
    const image = await Image.findById(imageId);
    if(!image) throw new ApiError(404, "Image not found");
    return res.status(200).json(new ApiResponse(200, {image}, "Image fetched successfully"));
});

const getImageByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if(!userId) throw new ApiError(400, "User ID is required");
    const image = await Image.find({uploaderId: userId});
    if(!image) throw new ApiError(404, "Image not found");
    return res.status(200).json(new ApiResponse(200, {image}, "Image fetched successfully"));
});

const deleteImageById = asyncHandler(async (req, res) => {
    const imageId = req.params.imageId;
    if(!imageId) throw new ApiError(400, "Image ID is required");
    const image = await Image.findByIdAndDelete(imageId);
    if(!image) throw new ApiError(404, "Image not found");
    return res.status(200).json(new ApiResponse(200, {image}, "Image deleted successfully"));
});

const updateImageById = asyncHandler(async (req, res) => {
    const imageId = req.params.imageId;
    if(!imageId) throw new ApiError(400, "Image ID is required");
    const image = await Image.findByIdAndUpdate(imageId, req.body, {new: true});
    if(!image) throw new ApiError(404, "Image not found");
    return res.status(200).json(new ApiResponse(200, {image}, "Image updated successfully"));
});

export { getImageById, getImageByUserId, deleteImageById, updateImageById };
