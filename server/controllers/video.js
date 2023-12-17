import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video ({userId: req.user.id, ...req.body});
    try{
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    }catch(err){
        next(err);
    }
}
export const updateVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video)  return next(createError(404, "Video not found!"));
        if(req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            },
            {
                new:true
            });
            res.status(200).json(updateVideo)
        }else{
            return next(createError(403, "you can update only your video"));
        }
    }catch(err){
        next(err);
    }
}
export const deleteVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video)  return next(createError(404, "Video not found!"));
        if(req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id);
            res.status(200).json(updateVideo)
        }else{
            return next(createError(403, "you can update only your video"));
        }
    }catch(err){
        next(err);
    }
}
export const getVideo = async (req, res, next) => {

    try{
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }catch(err){
        next(err);
    }
}

export const addView = async (req, res, next) => {

    try{
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        res.status(200).json("the view has been increased")
    }catch(err){
        next(err);
    }
}

export const random = async (req, res, next) => {

    try{
        const randVideos = await Video.aggregate([{$sample: {size:40}}])
        res.status(200).json(randVideos)
    }catch(err){
        next(err);
    }
}
export const trend = async (req, res, next) => {

    try{
        const trendVideos = await Video.find().sort({views: -1})(req.params.id)
        res.status(200).json(trendVideos)
    }catch(err){
        next(err);
    }
}
export const sub = async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;
        // console.log(subscribedChannels);
        // res.json(subscribedChannels)

        const list = await Promise.all(
            subscribedChannels.map((chanelId) => {
                return  Video.find({userId: chanelId});
            })
            );
        res.status(200).json(list.flat().sort((a, b)=> b.createdAt - a.createdAt))
    }catch(err){
        next(err);
    }
}

export const getBytags = async (req, res, next) => {
const tags = req.query.tags.split(',')
console.log(tags);
    try{
        const videos = await Video.find({tags: {$in: tags}}).limit(20);
        res.status(200).json(videos)
    }catch(err){
        next(err);
    }
}
export const search = async (req, res, next) => {
    const query = req.query.q
    console.log(query);
    try{
        const videos = await Video.find({title: {$regex: query, $options:"i"}}).limit(40);
        res.status(200).json(videos)
    }catch(err){
        next(err);
    }
}