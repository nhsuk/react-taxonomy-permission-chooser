import React from 'react';
import ReactDOM from 'react-dom';

import TaxonomyPermissionPanel from './components/TaxonomyPermissionPanel';

import taxonomySample from './taxonomySample';

ReactDOM.render(
  <TaxonomyPermissionPanel
    actions={taxonomySample.actions}
    vocabularyGroups={taxonomySample.vocabularyGroups}
  />,
  document.getElementById('root'),
);
