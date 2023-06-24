import React from 'react';
import { TabGenerator } from './generator';

const tabGenerator = new TabGenerator();

const TabGeneratorComponent = ({ tabType = 'map', data = '' }) => {
  const tab = tabGenerator.createTab(tabType);

  return (
    <div>
      {/* Render the appropriate content based on the tab type */}
      {tab.render({ data, type: tabType })}
    </div>
  );
};

export { TabGeneratorComponent };
