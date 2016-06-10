import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PostControls from 'flarum/utils/PostControls';
import Button from 'flarum/components/Button';
import CommentPost from 'flarum/components/CommentPost';
import DiscussionPage from 'flarum/components/DiscussionPage';

import SplitPostModal from 'davis/split/components/SplitPostModal';
import SplitController from 'davis/split/components/SplitController';

export default function(splitController) {

    extend(PostControls, 'moderationControls', function(items, post) {
        const discussion = post.discussion();

        if (post.contentType() !== 'comment' || !discussion.canSplit() || post.data.attributes.number == 1) return;

        items.add('splitFrom', [
            m(Button, {
                icon: 'code-fork',
                className: 'davis-split-startSplitButton',
                onclick: () => {
                    splitController.start(post.data.attributes.id, post.data.attributes.number, discussion.data.id);
                }
            }, app.translator.trans('davis-split.forum.post_controls.split_button'))
        ]);
    });

    extend(CommentPost.prototype, 'footerItems', function(items) {
        const post = this.props.post;
        const discussion = post.discussion();

        if (post.contentType() !== 'comment' ||  !discussion.canSplit() || post.data.attributes.number == 1) return;

        items.add('splitTo', [
            m(Button, {
                icon: 'code-fork',
                className: 'davis-split-endSplitButton Button Button--link',
                onclick: () => {
                    splitController.end(post.data.attributes.number);
                    var splitModal = new SplitPostModal();
                    splitModal.setController(splitController);
                    app.modal.show(splitModal);
                },
                style: {display: 'none'}
            }, app.translator.trans('davis-split.forum.post_footer.split_button'))
        ]);
    });
}
