// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dash Sylvereye',
  tagline:
    'Web-based visualizations of large road networks for dashboards built with the Dash framework',
  // GitHub Pages deploys this site to dashsylvereye.observatoriogeo.mx
  // (custom domain pinned by website/static/CNAME). Workflow:
  // .github/workflows/docs-deploy.yml.
  url: 'https://dashsylvereye.observatoriogeo.mx',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: 'img/logo-logo-border.png',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  organizationName: 'observatoriogeo',
  projectName: 'dash-sylvereye',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          path: 'docs',
          editUrl:
            'https://github.com/observatoriogeo/dash-sylvereye/edit/main/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Dash Sylvereye',
        logo: {
          alt: 'Dash Sylvereye Logo',
          src: 'img/logo-logo-border.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'example1',
            position: 'left',
            label: 'Examples',
          },
          {
            type: 'doc',
            docId: 'demo_visualization',
            position: 'left',
            label: 'Demo',
          },
          {
            href: 'https://doi.org/10.1109/ACCESS.2023.3327008',
            label: 'Paper',
            position: 'left',
          },
          {
            href: 'https://github.com/observatoriogeo/dash-sylvereye',
            label: 'GitHub',
            position: 'right',
          },
          {
            to: '/about',
            label: 'About',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Overview', to: '/docs/overview'},
              {label: 'Examples', to: '/docs/example1'},
              {label: 'API', to: '/docs/component_parameters'},
              {label: 'Development', to: '/docs/build_instructions'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Examples', to: '/docs/example1'},
              {label: 'Demo', to: '/docs/demo_visualization'},
              {label: 'Paper', href: 'https://doi.org/10.1109/ACCESS.2023.3327008'},
              {label: 'GitHub', href: 'https://github.com/observatoriogeo/dash-sylvereye'},
              {label: 'About', to: '/about'},
            ],
          },
          {
            title: 'Organization',
            items: [
              {
                label: 'CentroGeo',
                href: 'https://www.centrogeo.org.mx/',
              },
              {
                label: 'Observatorio Metropolitano',
                href: 'https://observatoriogeo.mx',
              },
            ],
          },
        ],
        logo: {
          alt: 'CentroGeo Logo',
          src: 'img/CentroGeo-CMX_Logo-V.png',
          href: 'https://www.centrogeo.org.mx/',
          width: 156,
          height: 125,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Centro de Investigación en Ciencias de Información Geoespacial, A.C.`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        additionalLanguages: ['python', 'bash'],
      },
    }),

  scripts: [
    {src: 'https://buttons.github.io/buttons.js', async: true},
  ],
};

module.exports = config;
