import { createAction, props } from '@ngrx/store';
import { SearchVideoResponse, Video } from '../modules/video/models/video';

export const loadVideos = createAction(
    '[Videos] Load Videos',
    props<{ data: { year?: string, videoType?: string, title?: string } }>()
);

export const loadVideosSuccess = createAction(
    '[Videos] Load videos',
    props<SearchVideoResponse>()
);

export const loadVideosFailure = createAction('[Videos] Load Videos Failure');

export const loadVideoById = createAction(
    '[Videos] Load Video By Id',
    props<{ data: { id: string } }>()
);

export const loadVideoByIdSuccess = createAction(
    '[Videos] Load Video By Id Success',
    props<{ data: Video }>()
);

export const loadVideoByIdFailure = createAction('[Videos] Load Videos By Id Failure');



