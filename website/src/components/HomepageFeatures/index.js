import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Powered by WebGL',
    image: 'img/WebGL_Logo.svg',
    imageClass: styles.iconWebgl,
    description: (
      <>
        WebGL-accelerated rendering keeps exploration smooth on
        topologies with tens of thousands of interactive elements,
        even on commodity hardware.
      </>
    ),
    link: {to: '/docs/software_stack', label: 'How it works →'},
  },
  {
    title: 'Dashboard visualizations',
    image: 'img/plotly-logo.svg',
    imageClass: styles.iconPlotly,
    description: (
      <>
        A first-class{' '}
        <Link href="https://plotly.com/dash/">Plotly Dash</Link>{' '}
        component library. Road-network data and visual properties
        react to any other Dash component or callback at runtime.
      </>
    ),
    link: {to: '/docs/example1', label: 'See examples →'},
  },
  {
    title: 'Fully customizable',
    image: 'img/openstreetmap-logo.svg',
    imageClass: styles.iconOsm,
    description: (
      <>
        Per-element control of size, color, transparency, and visibility
        for every node, edge, and marker, plus a swappable OSM tile layer.
        chroma.js scales and{' '}
        <Link href="https://github.com/gboeing/osmnx">OSMnx</Link>{' '}
        loaders ship in the box.
      </>
    ),
    link: {to: '/docs/component_parameters', label: 'Reference →'},
  },
];

function Feature({title, image, imageClass, description, link}) {
  const imgUrl = useBaseUrl(image);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="padding-horiz--md text--center">
        <div className={styles.featureIconWrap}>
          <img
            src={imgUrl}
            alt={title}
            className={clsx(styles.featureImage, imageClass)}
          />
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {link && (
          <Link to={link.to} className={styles.featureLink}>
            {link.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
