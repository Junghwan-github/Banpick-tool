module.exports = {
    siteUrl: 'https://banpick.vercel.app',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    priority: 1,
    outDir: './out',
    robotsTxtOptions: {
      policies: [
          {
              userAgent: '*', 
              allow: '/', 
              disallow: [
                  '/ban-pick',
                  '/ready' 
              ]
          },
      ]
  }
  };