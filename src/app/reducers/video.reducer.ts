import { createReducer, on } from '@ngrx/store';
import { Video } from '../modules/video/models/video';
import * as VideoActions from '../actions/video.action';

export const videoFeatureKey = 'Video';

export interface VideoState {
    videos: Video[];
    video: Video | null;
}

export const initialState: VideoState = {
    videos: [],
    video: null
};

export const videoReducer = createReducer(
    initialState,
    on(VideoActions.loadVideosSuccess, (state, action) => (
        {
            ...state,
            videos: action.Search
        })),
    on(VideoActions.loadVideoByIdSuccess, (state, action) => (
        {
            ...state,
            video: action.data
        }))
);
