import { useClient, useCurrentUser } from 'sanity';
import type { DocumentActionDescription, DocumentActionProps } from 'sanity';
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret';
import { EyeOpenIcon } from '@sanity/icons';
import { generateDatedPostSlug } from '@/util';
import { postPreviewQuery } from '@studio/sanity-queries';
import type { PostPreviewQueryResult } from '@studio/sanity-typegen';

export const PreviewAction = (props: DocumentActionProps) => {
    const { id, type, draft } = props;

    const client = useClient({ apiVersion: 'v2022-03-07' });
    const currentUser = useCurrentUser();

    const onHandle = async () => {
        const { secret: token } = await createPreviewSecret(
            client, 'previewAction', location.href, currentUser?.id
        );

        const post = await client.fetch<PostPreviewQueryResult>(postPreviewQuery, {
            id: draft?._id
        });
        if (!post) {
            alert("Error opening preview: Post not found"); return;
        }

        const datedSlug = generateDatedPostSlug(post.datePublished, post.slug.current);

        const params = new URLSearchParams();
        params.append('token', token);

        window.open(`/${datedSlug}/preview?${params}`, '_blank');
    };

    const disabled = type != "post" ||
        !draft?.datePublished ||
        !draft?.slug;

    const action: DocumentActionDescription = {
        label: 'Preview',
        icon: EyeOpenIcon,
        onHandle,
        disabled
    };

    return action;
};