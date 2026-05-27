import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function About() {
  const centrogeoLogo = useBaseUrl('img/CentroGeo-CMX_Logo-V.png');
  const omLogo = useBaseUrl('img/Logo-OM-resized.png');

  return (
    <Layout title="About" description="About Dash Sylvereye">
      <div className="docMainWrapper wrapper">
        <div
          className="mainContainer documentContainer postContainer"
          style={{maxWidth: 960, margin: '0 auto', padding: '2rem 1rem'}}>
          <div className="post">
            <header className="postHeader">
              <h1>About</h1>
            </header>

            <div
              style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
              }}>
              <div style={{flex: 1, minWidth: 200, textAlign: 'center'}}>
                <img
                  src={centrogeoLogo}
                  alt="CentroGeo"
                  style={{maxWidth: 200, marginBottom: '1rem'}}
                />
                <h3>CentroGeo</h3>
                <p>
                  Dash Sylvereye is being developed at the{' '}
                  <a href="https://www.centrogeo.org.mx/">CentroGeo</a> Querétaro
                </p>
              </div>
              <div style={{flex: 1, minWidth: 200, textAlign: 'center'}}>
                <img
                  src={omLogo}
                  alt="Observatorio Metropolitano"
                  style={{maxWidth: 200, marginBottom: '1rem'}}
                />
                <h3>Observatorio Metropolitano</h3>
                <p>
                  Dash Sylvereye is a research and tech product of the{' '}
                  <a href="https://observatoriogeo.mx">Observatorio Metropolitano CentroGeo</a>
                </p>
              </div>
            </div>

            <h2>Contributors</h2>
            <p>
              The following is the list of the dedicated people who contribute or have contributed
              to the development and/or diffusion of Dash Sylvereye:
            </p>

            <ul>
              <li>
                <a href="https://albertogarob.mx/">Alberto García Robledo</a> (project lead),
                CentroGeo, SECIHTI
              </li>
              <li>Mahboobeh Zangiabady, University of Twente</li>
              <li>
                David Reyes Rafael, Instituto Tecnológico Superior del Occidente del Estado de
                Hidalgo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
