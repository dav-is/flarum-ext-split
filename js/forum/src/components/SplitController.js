export default class SplitController {
    constructor () {
        this._isSplitting = false;
    }

    start(postId, postNumber, discussionId) {
        // should not be necessary
        if (postId == 1) return;

        this._startPost = postId;
        this._discussion = discussionId;
        this._isSplitting = true;

        $('.PostStream-item').each(function () {
            var postIndex = $(this).attr('data-number');
            if (postIndex > postNumber) {
                $('.davis-split-endSplitButton', $(this)).show();
            }
        });
        $('.davis-split-startSplitButton').hide();

    }

    end(postNumber) {
        this._endPost = postNumber;
    }

    startPost() {
        return this._startPost;
    }

    endPost() {
        return this._endPost;
    }

    reset() {
        this._isSplitting = false;
        this._startPost = null;
        this._endPost = null;
    }
}