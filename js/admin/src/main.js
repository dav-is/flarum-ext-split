import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

//import addImageUploadPane from 'davis/image-upload/addImageUploadPane'

app.initializers.add('davis-split', app => {
    //addSplitPane();

    extend(PermissionGrid.prototype, 'moderateItems', items => {
    items.add('splitDiscussion', {
      icon: 'code-fork',
      label: app.translator.trans('davis-split.admin.permissions.split_discussion_label'),
      permission: 'discussion.split'
    }, 65);
  });
});
