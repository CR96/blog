import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { BlockContentIcon, FolderIcon, BookIcon } from '@sanity/icons';

export default (S, context) => {
    return S.list()
        .title('Content')
        .items([
            S.listItem('post')
                .title('Posts')
                .icon(BlockContentIcon)
                .child(
                    S.documentList('post')
                        .title('Posts')
                        .apiVersion('v2022-03-07')
                        .filter('_type == "post"')
                        .defaultOrdering([ {
                            field: 'datePublished',
                            direction: "desc"
                        } ])
                ),
            orderableDocumentListDeskItem({
                S, context,
                title: 'Topics',
                type: 'topic',
                icon: FolderIcon
            }),
            S.listItem('subject')
                .title('Subjects')
                .icon(BookIcon)
                .child(
                    S.documentList('subject')
                        .title('Subjects')
                        .apiVersion('v2022-03-07')
                        .filter('_type == "subject"')
                )
        ]);
};