import React from 'react';

import TaxonomyPermissionChooser from './TaxonomyPermissionChooser';

function TaxonomyPermissionAction(props) {

  return (
    <div>
      {props.action.label}:
      <ul>
        {props.vocabularyGroups && props.vocabularyGroups.map((group) => (
          <li key={`${props.action.code}-${group.code}`}>{group.label}:</li>
        ))}
      </ul>
      <TaxonomyPermissionChooser vocabularyGroups={props.vocabularyGroups} />
    </div>
  );
}

export default TaxonomyPermissionAction;
