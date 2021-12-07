import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as video from '../reducers/video.reducer';

export const selectVideoState = createFeatureSelector<video.VideoState>(video.videoFeatureKey);

export const selectVideos = createSelector(selectVideoState, (state: video.VideoState) => state.videos);

export const selectVideo = createSelector(selectVideoState, (state: video.VideoState) => state.video);



