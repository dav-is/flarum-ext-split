import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Discussion from 'flarum/models/Discussion';

import SplitController from 'davis/split/components/SplitController';

export default class SplitPostModal extends Modal {
    init() {
        super.init();

        this.success = false;

        this.gotError = false;

        this.newDiscussionTitle = m.prop('');

    }

    setController(splitController) {
        this.splitController = splitController;

        this.splitController.log();

    }

    className() {
        return 'SplitPostModal Modal--small';
    }

    title() {
        return app.translator.trans('flagrow-split.forum.modal.title');
    }

    content() {
        if (this.success && ! this.gotError) {
            return [
                m('div', {className: 'Modal-body'}, [
                    m('div', {className: 'Form Form--centered'}, [
                        m('p', {className: 'helpText'}, app.translator.trans('flagrow-split.forum.modalconfirmation_message')),
                        m('div', {className: 'Form-group'}, [
                            m(Button, {
                                className: 'Button Button--primary Button--block',
                                onclick: this.hide.bind(this)
                            }, app.translator.trans('flagrow-split.forum.modal.dismiss_button'))
                        ])
                    ])
                ])
            ];
        }

        return [
            m('div', {className: 'Modal-body'}, [
                m('div', {className: 'Form Form--centered'}, [
                    m('div', {className: 'Form-group'}, [
                        m('label', {},  app.translator.trans('flagrow-split.forum.modal.new_discussion_label')),
                        m('input', {
                            name: 'new_discussion_title',
                            value: this.newDiscussionTitle(),
                            oninput: m.withAttr('value', this.newDiscussionTitle)
                        })
                    ]),
                    m('div', {className: 'Form-group'}, [
                        m(Button, {
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            disabled: !this.newDiscussionTitle()
                        }, app.translator.trans('flagrow-split.forum.modal.submit_button'))
                    ])
                ])
            ])
        ];
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        const data = new FormData();

        data.append('title', this.newDiscussionTitle());
        data.append('start_post_id', this.splitController.startPost());
        data.append('end_post_number', this.splitController.endPost());

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/split',
            serialize: raw => raw,
            data
        }).then(
            discussion => {
                discussion.data.id = m.prop(discussion.data.id);
                discussion.data.attributes.slug = m.prop(discussion.data.attributes.slug);
                discussion.data.attributes.startUser = m.prop(discussion.data.attributes.startUser);
                discussion.data.attributes.isUnread = m.prop(discussion.data.attributes.isUnread);
                console.log(discussion.data);
                app.cache.discussionList.addDiscussion(discussion.data);
                this.success = true;
                this.hide();
                console.log(app.route.discussion(discussion.data));
                m.route(app.route.discussion(discussion.data));
            },
            this.loaded.bind(this)
        );
    }
}
