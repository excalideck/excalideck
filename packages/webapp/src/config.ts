const APP_CONFIG: { [key: string]: string } = (window as any).APP_CONFIG ?? {};

export default {
    isHomepage: APP_CONFIG["IS_HOMEPAGE"] === "true",
};
