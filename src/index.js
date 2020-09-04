import React from 'react';
import ReactDOM from 'react-dom';

import TaxonomyPermissionPanel from './components/TaxonomyPermissionPanel';

import taxonomySample from './taxonomySample.json';

console.log(document.getElementById('id_permission_inherit_page_chooser'));
ReactDOM.render(
  <TaxonomyPermissionPanel
    actions={taxonomySample.actions}
    vocabularyGroups={taxonomySample.vocabularyGroups}
    globalPermissionFieldId="global-permission"
    inheritPermissionFieldId="inherit-permission"
    taxonomyPermissionJsonId="id_taxonomy_permission_json"
    taxonomyPermissionInheritParent={document.getElementById('id_permission_inherit_page_chooser')}
  />,
  document.getElementById('root'),
);
