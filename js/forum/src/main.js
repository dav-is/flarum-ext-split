import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';

import addSplitControl from 'davis/split/addSplitControl';

import SplitController from 'davis/split/components/SplitController';

//import extendDiscussionPage from 'davis/split/extendDiscussionPage';

app.initializers.add('davis-split', app => {

    app.store.models.discussions.prototype.canSplit = Model.attribute('canSplit');

    //extendDiscussionPage();

    var splitController = new SplitController();

    addSplitControl(splitController);
});
