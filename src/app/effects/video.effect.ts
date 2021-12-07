import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as VideoActions from '../actions/video.action';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { VideoApi } from '../common/api/video';

@Injectable()
export class VideoEffects {
    constructor(private actions$: Actions, private api: VideoApi) { }

    loadVideos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.loadVideos),
            mergeMap((action) => this.api.getAll(action.data?.year, action.data?.videoType, action.data?.title)
                .pipe(map(data => VideoActions.loadVideosSuccess(data), catchError(() => [VideoActions.loadVideosFailure()])))
            ));
    });

    loadVideoById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.loadVideoById),
            mergeMap((action) => this.api.getById(action.data.id)
                .pipe(map(data => VideoActions.loadVideoByIdSuccess({ data }), catchError(() => [VideoActions.loadVideoByIdFailure()])))
            ));
    });

}
