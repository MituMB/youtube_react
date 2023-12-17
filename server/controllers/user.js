import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";


//update user
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    //todo
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body},
        {new: true})
      res.status(200).json(updateUser)
    } catch(err) {
      next(err)
    }
  } else {
    return next(createError(403, "you can update only your account"));
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        //todo
        try {
             await User.findByIdAndDelete(req.params.id)
             res.status(200).json('User has been deleted')
        } catch(err) {
          next(err)
        }
      } else {
        return next(createError(403, "you can delete only your account"));
      }
};


//get single user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user) ;
    } catch (err) {
        next(err)
    }
};
//subscribe users
export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {subscribedUsers: req.params.id}, //other channels userid
        })  ;
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1},
        });
        res.status(200).json("Subscription Successful.")
    } catch (err) {
        next(err)
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedUsers: req.params.id},
        })  ;
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1},
        });
        res.status(200).json("Unsubscription  Successful.")
        
    } catch (err) {
        next(err)
    }
};

export const like = async (req, res, next) => {
    const id = req.user.id;
    const video_id = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(video_id, {
            $addToSet: { likes: id},
            $pull: { dislikes: id}
        })
        res.status(200).json("Video has been liked.")
    } catch (err) {
        next(err)
    }
};

export const dislike = async (req, res, next) => {
    const user_id = req.user.id;
    const video_id = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(video_id, {
            $addToSet: { dislikes: user_id},
            $pull: { likes: user_id}
        })
        res.status(200).json("Video has been disliked.")
    }  catch (err) {
        next(err)
    }
};
