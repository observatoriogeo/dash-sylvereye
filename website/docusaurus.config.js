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
          // Docs are versioned. Snapshotted releases live under
          // `versioned_docs/version-<v>/`. The in-development `docs/`
          // tree ("current" / "Next") is hidden from the dropdown via
          // `includeCurrentVersion: false` — visitors only ever see
          // released versions. To cut a new release, run:
          //   npx docusaurus docs:version <newVersion>
          // then add the entry to the `versions` map and bump
          // `lastVersion` here. Edits to `docs/` stay invisible until
          // they're snapshotted.
          includeCurrentVersion: false,
          lastVersion: '0.4.1',
          versions: {
            '0.4.1': {label: '0.4.1'},
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // Offline/static-site search. Builds a lunr-style index at build time
  // and adds a search modal to the navbar. No Algolia account or runtime
  // API keys; everything ships inside the static bundle. See:
  //   https://github.com/easyops-cn/docusaurus-search-local
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        docsRouteBasePath: '/docs',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
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
            position: 'right',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'example1',
            position: 'right',
            label: 'Examples',
          },
          {
            type: 'doc',
            docId: 'demo_visualization',
            position: 'right',
            label: 'Demo',
          },
          {
            type: 'docsVersionDropdown',
            position: 'left',
          },
          {
            href: 'https://doi.org/10.1109/ACCESS.2023.3327008',
            label: 'Paper',
            position: 'right',
          },
          {
            href: 'https://github.com/observatoriogeo/dash-sylvereye',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://pypi.org/project/dash-sylvereye/',
            label: 'PyPI',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'about',
            position: 'right',
            label: 'About',
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
              {label: 'Reference', to: '/docs/component_parameters'},
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
              {label: 'About', to: '/docs/about'},
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
