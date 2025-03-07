const EnvironmentService = () => ({
  notion: {
    secret: String(process.env.NOTION_SECRET_KEY),
    postsDatabaseId: String(process.env.NOTION_POSTS_DB_ID),
    printsDatabaseId: String(process.env.NOTION_PRINTS_DB_ID),
  },
  whatsapp: {
    number: String(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  },
  mixpanel: {
    token: String(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN),
  },
  store: {
    url: String(process.env.NEXT_PUBLIC_STORE_URL),
  },
  backOffice: {
    url: String(process.env.BACK_OFFICE_API_URL),
  },
});

const environmentService = EnvironmentService();

export default environmentService;
