import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { VideoState } from 'src/app/reducers/video.reducer';
import { selectVideos } from 'src/app/selectors/video.selector';
import { Video } from '../../models/video';
import { debounceTime } from 'rxjs/operators';
import { loadVideos } from 'src/app/actions/video.action';
import { Router } from '@angular/router';
import { videoTypes, years } from 'src/app/common/dictionaries/selects';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {
  public items$?: Observable<Video[]> = this.store.select(selectVideos);
  private subject: Subject<string> = new Subject();
  private sub?: Subscription;
  public videoTypesOptions = videoTypes;
  public yearsOptions = years;
  public searchValue?: string;
  public videoTypeValue?: string;
  public yearsValue?: string;

  constructor(private store: Store<VideoState>, private router: Router) {
  }

  ngOnInit(): void {
    this.sub = this.subject.pipe(debounceTime(500)).subscribe((searchValue: string) => { 
      this.searchValue = searchValue;
      this.dispatch();
    });
  }

  public onSearch(event: any): void {
    this.subject.next(event.target.value);
  }

  public goToDetails(id: string): void {
    this.router.navigate(['video', id]);
  }

  public onVideoTypesOptionsChange(value: string): void {
    this.videoTypeValue = value;
    this.dispatch();
  }

  public onYearsOptionsChange(value: string): void {
    this.yearsValue = value;
    this.dispatch();
  }

  private dispatch(): void {
    this.store.dispatch(loadVideos({data: {title: this.searchValue, year: this.yearsValue, videoType: this.videoTypeValue}}));
  }

  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }
}
