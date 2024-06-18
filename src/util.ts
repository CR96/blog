export const generateDatedPostSlug = (datePublished: string, baseSlug: string) => {
    const date = new Date(datePublished);
    const dateFormatted = date.toISOString().split('T')[0].replaceAll('-', '/');
    return `${dateFormatted}/${baseSlug}`;
};