import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Comment } from 'src/app/core/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment = {
    id: -1,
    username: 'commenuser',
    avatarUrl: 'https://source.unsplash.com/1600x900/?product',
    content: 'this is the review content',
    time: new Date(1609834043000),
    productId: -1,
  };

  constructor() {}

  ngOnInit(): void {}
}
