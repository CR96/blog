import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { BlockContentIcon, FolderIcon } from '@sanity/icons';

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
                        .filter('_type == "post"')
                        .defaultOrdering([{
                            field: 'datePublished',
                            direction: "desc"
                        }])
                ),
            orderableDocumentListDeskItem({
                S, context,
                title: 'Topics',
                type: 'topic',
                icon: FolderIcon
            })
        ]);
};