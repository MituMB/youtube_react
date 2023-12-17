import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentVideo: null,
  fetching:false,
  error:false
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
      fetchStart: (state) => {
        state.fetching = true
      },
      fetchSuccess: (state,action) => {
        state.fetching = false
        state.currentVideo = action.payload
      },
      fetchFailure: (state) => {
        state.fetching = false
        state.error = true
      },
      like: (state,action) => {
       if(!state.currentVideo.likes.includes(action.payload)){
        state.currentVideo.likes.push(action.payload)
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),1)
       }
      },

      dislike: (state,action) => {
        if(!state.currentVideo.dislikes.includes(action.payload)){
         state.currentVideo.dislikes.push(action.payload)
         state.currentVideo.likes.splice(
           state.currentVideo.likes.findIndex(
             (userId) => userId === action.payload
           ),1)
        }
       },

    },
  })

  export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions
  export default videoSlice.reducer