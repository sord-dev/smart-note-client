import React, { useEffect } from 'react';
import { TabGenerator } from './generator';
const tabGenerator = new TabGenerator();

const TabGeneratorComponent = ({ tabType = 'map', data = '' }) => {
  const tab = tabGenerator.createTab(tabType);


  return (
    <div>
      {tab.render({ data, type: tabType })}
    </div>
  );
};

export { TabGeneratorComponent };
