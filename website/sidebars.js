/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Overview',
      items: ['overview', 'features', 'installation'],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'running_examples',
        'example1',
        'example2',
        'example3',
        'example4',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'component_parameters',
        'click_events',
        'data_format',
        'data_loading',
        'data_utils',
        'nodes_customization',
        'edges_customization',
        'markers_customization',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: ['build_instructions', 'software_stack'],
    },
    {
      type: 'category',
      label: 'About',
      items: ['about', 'citation', 'authorship_and_license'],
    },
  ],
};

module.exports = sidebars;
