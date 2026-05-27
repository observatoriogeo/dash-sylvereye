import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('img/website_logo_transparent_background.png');
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          src={logoUrl}
          alt="Dash Sylvereye"
          className={styles.heroLogo}
        />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.install}>
          <CodeBlock language="bash">pip install dash-sylvereye</CodeBlock>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview">
            Get started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/example1">
            Examples
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://doi.org/10.1109/ACCESS.2023.3327008">
            Read the paper
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/observatoriogeo/dash-sylvereye">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureRow({title, body, imagePath, dark}) {
  const imgSrc = useBaseUrl(imagePath);
  return (
    <section className={clsx(styles.featureRow, dark && styles.featureRowDark)}>
      <div className={clsx('container', styles.featureRowInner)}>
        <div className={styles.featureRowText}>
          <Heading as="h2" className={styles.featureRowTitle}>
            {title}
          </Heading>
          <p>{body}</p>
        </div>
        <div className={styles.featureRowImage}>
          <img src={imgSrc} alt={title} />
        </div>
      </div>
    </section>
  );
}

const BIBTEX = `@article{garciarobledo2023sylvereye,
  author  = {Garcia-Robledo, Alberto and Zangiabady, Mahboobeh},
  title   = {Dash {S}ylvereye: A {P}ython Library for Dashboard-Driven Visualization of Large Street Networks},
  journal = {IEEE Access},
  volume  = {11},
  pages   = {121142--121161},
  year    = {2023},
  doi     = {10.1109/ACCESS.2023.3327008},
}`;

function CitePanel() {
  return (
    <section className={styles.cite}>
      <div className={clsx('container', styles.citeInner)}>
        <Heading as="h2">Cite this work</Heading>
        <p className={styles.citeIntro}>
          If you use Dash Sylvereye in your research, please cite the
          original paper.
        </p>
        <p className={styles.citeReference}>
          A. Garcia-Robledo and M. Zangiabady,{' '}
          <strong>
            "Dash Sylvereye: A Python Library for Dashboard-Driven
            Visualization of Large Street Networks,"
          </strong>{' '}
          in <em>IEEE Access</em>, vol.{' '}
          <strong>11</strong>, pp. 121142-121161, 2023.
        </p>
        <p className={styles.citeDoi}>
          <Link href="https://doi.org/10.1109/ACCESS.2023.3327008">
            https://doi.org/10.1109/ACCESS.2023.3327008
          </Link>
        </p>
        <div className={styles.citeBibtex}>
          <CodeBlock language="bibtex">{BIBTEX}</CodeBlock>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            href="https://doi.org/10.1109/ACCESS.2023.3327008">
            Read the paper (DOI ↗)
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureCallout() {
  return (
    <section className={styles.callout}>
      <div className="container">
        <Heading as="h2">Get started</Heading>
        <div className={styles.calloutInstall}>
          <CodeBlock language="bash">pip install dash-sylvereye</CodeBlock>
        </div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/overview">
            Documentation
          </Link>
          <Link className="button button--primary button--lg" to="/docs/example1">
            Examples
          </Link>
          <Link className="button button--primary button--lg" to="/docs/demo_visualization">
            Demo
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/observatoriogeo/dash-sylvereye">
            GitHub
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://pypi.org/project/dash-sylvereye/">
            PyPI
          </Link>
        </div>
      </div>
    </section>
  );
}

const HOMEPAGE_DESCRIPTION =
  'Dash Sylvereye: WebGL-accelerated visualization of large primal road networks for Plotly Dash dashboards. Companion site to the IEEE Access 2023 paper by Garcia-Robledo and Zangiabady (DOI 10.1109/ACCESS.2023.3327008).';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={HOMEPAGE_DESCRIPTION}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <FeatureRow
          dark
          title="Web-based visualization of road networks in Python"
          body="Dash Sylvereye is an open-source component library for Plotly Dash that produces interactive, web-based visualizations of large primal road networks straight from Python."
          imagePath="img/sylverlight-screenshot1.png"
        />
        <FeatureRow
          title="Rich dashboards built around road networks"
          body="Full integration with Plotly Dash: road-network data and visual properties update reactively in response to any other Dash component."
          imagePath="img/sylverlight-screenshot4.png"
        />
        <FeatureRow
          dark
          title="Accelerated rendering of large-scale road networks"
          body="With WebGL under the hood, you can smoothly navigate tens of thousands of interactive nodes, edges, and markers on commodity hardware such as a mid-range laptop."
          imagePath="img/sylverlight-screenshot3.png"
        />
        <FeatureRow
          title="Customize colors, sizes, and more"
          body="Every visualization is fully customizable: control the size, color, transparency, and visibility of each individual node, edge, and marker through a small, consistent set of options."
          imagePath="img/sylverlight-screenshot2.png"
        />
        <FeatureRow
          dark
          title="Visualize data from OpenStreetMap"
          body="Convenient utilities for loading OpenStreetMap road-network topologies produced by the OSMnx library, ready to render in a single call."
          imagePath="img/sylverlight-screenshot5.png"
        />
        <CitePanel />
        <FeatureCallout />
      </main>
    </Layout>
  );
}
