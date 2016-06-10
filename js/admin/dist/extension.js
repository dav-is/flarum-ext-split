'use strict';

System.register('davis/split/main', ['flarum/extend', 'flarum/app', 'flarum/components/PermissionGrid'], function (_export, _context) {
  "use strict";

  var extend, app, PermissionGrid;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsPermissionGrid) {
      PermissionGrid = _flarumComponentsPermissionGrid.default;
    }],
    execute: function () {

      //import addImageUploadPane from 'davis/image-upload/addImageUploadPane'

      app.initializers.add('davis-split', function (app) {
        //addSplitPane();

        extend(PermissionGrid.prototype, 'moderateItems', function (items) {
          items.add('splitDiscussion', {
            icon: 'code-fork',
            label: app.translator.trans('davis-split.admin.permissions.split_discussion_label'),
            permission: 'discussion.split'
          }, 65);
        });
      });
    }
  };
});