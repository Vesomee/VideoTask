import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { StoreModule } from '@ngrx/store';
import { videoFeatureKey, videoReducer } from 'src/app/reducers/video.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { VideoEffects } from 'src/app/effects/video.effect';



@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(videoFeatureKey, videoReducer),
    BrowserModule,
    EffectsModule.forRoot([VideoEffects])
  ]
})
export class VideoModule { }
