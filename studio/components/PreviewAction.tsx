import { useClient, useCurrentUser } from 'sanity';
import type { DocumentActionDescription, DocumentActionProps } from 'sanity';
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret';
import { EyeOpenIcon } from '@sanity/icons';

export const PreviewAction = (props: DocumentActionProps) => {
    const { id, type, draft } = props;

    const client = useClient();
    const currentUser = useCurrentUser();

    const onHandle = async () => {
        const { secret } = await createPreviewSecret(
            client, 'previewAction', location.href, currentUser?.id
        );

        const params = new URLSearchParams();
        params.append('id', id);
        params.append('secret', secret);

        window.open(`/api/preview?${params}`, '_blank');
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