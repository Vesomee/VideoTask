import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadVideoById } from 'src/app/actions/video.action';
import { LocalStorage } from 'src/app/common/helpers/localstorage';
import { StorageService } from 'src/app/common/storage.service';
import { VideoState } from 'src/app/reducers/video.reducer';
import { selectVideo } from 'src/app/selectors/video.selector';
import { Video } from '../../models/video';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  public storageKey = 'savedVideos';
  public video?: Video | null;
  public get id(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private store: Store<VideoState>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.store.dispatch(loadVideoById({data: {id: this.id}}));

      this.store.select(selectVideo).subscribe((video) => {
        this.video = video;
        this.cdr.detectChanges();
      });
    }
  }

  public get isOnWatchList(): boolean {
    if (this.id) {
      const item = this.storageService.getItem(this.storageKey);

      return item && JSON.parse(item).includes(this.id);
    }

    return false;
  }

  public toggleWatchList(): void {
    const items: string | null = this.storageService.getItem(this.storageKey);

    if (items && this.isOnWatchList && this.id) {
      this.removeFromWatchList(items);

      return;
    }

    this.addToWatchList(items);
    this.cdr.detectChanges();
  }

  private removeFromWatchList(items: string): void {
    const data = LocalStorage.removeItemFromArrayString(items, this.id!);

    this.storageService.saveItem(this.storageKey, data);
  }

  private addToWatchList(items: string | null): void {
    if (this.id && items && Array.isArray(JSON.parse(items))) {
      const data = LocalStorage.appendItemToArrayString(items, this.id);

      this.storageService.saveItem(this.storageKey, data)

      return;
    }

    this.storageService.saveItem(this.storageKey, JSON.stringify([this.id]));
  }
}
