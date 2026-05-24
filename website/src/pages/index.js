import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomeSplash() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('img/website_logo_solid_background.png');
  return (
    <div className="homeContainer">
      <div className="homeSplashFade">
        <div className="wrapper homeWrapper">
          <div>
            <img src={logoUrl} alt="Dash Sylvereye Logo" style={{maxWidth: 220}} />
          </div>
          <div className="inner">
            <h2 className="projectTitle">
              <small>{siteConfig.tagline}</small>
            </h2>
            <div className="section promoSection">
              <div className="promoRow">
                <div className="pluginRowBlock">
                  <div className="pluginWrapper buttonWrapper">
                    <Link className="button" to="/docs/overview">Documentation</Link>
                  </div>
                  <div className="pluginWrapper buttonWrapper">
                    <Link className="button" to="/docs/example1">Examples</Link>
                  </div>
                  <div className="pluginWrapper buttonWrapper">
                    <Link className="button" to="/docs/demo_visualization">Demo</Link>
                  </div>
                  <div className="pluginWrapper buttonWrapper">
                    <a className="button" href="https://doi.org/10.1109/ACCESS.2023.3327008">Paper</a>
                  </div>
                  <div className="pluginWrapper buttonWrapper">
                    <a className="button" href="https://github.com/observatoriogeo/dash-sylvereye">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({image, title, content}) {
  return (
    <div className="featureCard">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

function Features() {
  const fastLoadImg = useBaseUrl('img/undraw_fast_loading_0lbh.svg');
  const destImg = useBaseUrl('img/undraw_destinations_fpv7.svg');
  const customImg = useBaseUrl('img/undraw_advanced_customization_58j6.svg');

  const features = [
    {
      image: fastLoadImg,
      title: 'Powered by WebGL',
      content:
        'WebGL-accelerated drawing of road networks allowing for a smooth exploration of large topologies with dozens of thousands elements.',
    },
    {
      image: destImg,
      title: 'Dashboard visualizations',
      content:
        'Develop interactive web dashboards focused on road network visualizations: Dash Sylvereye is a component library crafted for the Dash framework.',
    },
    {
      image: customImg,
      title: 'Fully customizable',
      content:
        'Personalize the visibility, transparency, color, and size of individual road network elements. Compose your own code to manage click events on nodes, edges, and markers.',
    },
  ];

  return (
    <div style={{padding: '3rem 2rem', backgroundColor: '#0470bc', color: '#fff'}}>
      <div className="featureGrid">
        {features.map((f, idx) => (
          <FeatureCard key={idx} {...f} />
        ))}
      </div>
    </div>
  );
}

function FeatureRow({title, content, imagePath, dark}) {
  const imgSrc = useBaseUrl(imagePath);
  return (
    <div
      style={{
        backgroundColor: dark ? '#f0f4f8' : '#fff',
        padding: '3rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
      <div style={{flex: 1, minWidth: 280}}>
        <h2 style={{color: '#0470bc'}}>{title}</h2>
        <p>{content}</p>
      </div>
      <div style={{flex: 1, minWidth: 280}}>
        <img
          src={imgSrc}
          alt={title}
          style={{
            width: '100%',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        />
      </div>
    </div>
  );
}

function FeatureCallout() {
  return (
    <div style={{padding: '3rem 2rem', textAlign: 'center'}}>
      <h2>Get Started Now</h2>
      <p>Install Dash Sylvereye with pip:</p>
      <pre
        style={{
          display: 'inline-block',
          background: '#f6f8fa',
          padding: '0.75rem 2rem',
          borderRadius: 4,
          fontFamily: 'monospace',
          fontSize: '1rem',
        }}>
        pip install dash-sylvereye
      </pre>
      <br />
      <br />
      <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem'}}>
        <Link className="button button--primary button--lg" to="/docs/overview">
          Documentation
        </Link>
        <Link className="button button--primary button--lg" to="/docs/example1">
          Examples
        </Link>
        <Link className="button button--primary button--lg" to="/docs/demo_visualization">
          Demo
        </Link>
        <a className="button button--secondary button--lg" href="https://doi.org/10.1109/ACCESS.2023.3327008">
          Paper
        </a>
        <a
          className="button button--secondary button--lg"
          href="https://github.com/observatoriogeo/dash-sylvereye">
          GitHub
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomeSplash />
      <main>
        <Features />
        <FeatureRow
          dark={true}
          title="Web-based visualization of road networks with Python"
          content="Dash Sylvereye is an open-source Dash component library for producing interactive web-based visualizations of large primal road networks with Python"
          imagePath="img/sylverlight-screenshot1.png"
        />
        <FeatureRow
          dark={false}
          title="Rich dashboards around road networks with Dash"
          content="Full integration with Plotly Dash: road network data and visual properties can be dynamically updated by reacting to other Dash components"
          imagePath="img/sylverlight-screenshot4.png"
        />
        <FeatureRow
          dark={true}
          title="Accelerated rendering of large-scale road networks"
          content="Thanks to WebGL you can smoothly navigate through dozens of thousands of interactive nodes, edges, and markers in commodity systems such as mid-range laptops and desktop computers"
          imagePath="img/sylverlight-screenshot3.png"
        />
        <FeatureRow
          dark={false}
          title="Customize colors, sizes, and more"
          content="Dash Sylvereye visualizations are fully customizable: use different methods to manipulate the size, color, transparency, and visibility of each individual node, edge, or marker"
          imagePath="img/sylverlight-screenshot2.png"
        />
        <FeatureRow
          dark={true}
          title="Visualize data from OpenStreetMap"
          content="Dash Sylvereye provides convenient functions to visualize OpenStreetMap road network topologies generated by the excellent OSMnx library"
          imagePath="img/sylverlight-screenshot5.png"
        />
        <FeatureCallout />
      </main>
    </Layout>
  );
}
