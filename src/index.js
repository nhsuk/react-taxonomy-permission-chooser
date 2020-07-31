import React from 'react';
import ReactDOM from 'react-dom';

import TaxonomyPermissionPanel from './components/TaxonomyPermissionPanel';

import taxonomySample from './taxonomySample.json';

ReactDOM.render(
  <TaxonomyPermissionPanel
    actions={taxonomySample.actions}
    vocabularyGroups={taxonomySample.vocabularyGroups}
    globalPermissionFieldId="global-permission"
    inheritPermissionFieldId="inherit-permission"
    taxonomyPermissionJsonId="id_taxonomy_permission_json"
  />,
  document.getElementById('root'),
);
