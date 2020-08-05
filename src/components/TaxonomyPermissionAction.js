import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import TaxonomyPermissionChooser from './TaxonomyPermissionChooser';
import TaxonomyContext from './TaxonomyContext';

function TaxonomyPermissionAction(props) {
  const { vocabularyGroups } = useContext(TaxonomyContext);
  const { vocabularyLabels } = useContext(TaxonomyContext);
  const { taxonomyPermission } = useContext(TaxonomyContext);
  const [taxonomyPermissionState, setTaxonomyPermissionState] = useState(taxonomyPermission);

  function getData(actionId, groupId) {
    const valueLabels = [];
    if (actionId in taxonomyPermissionState && groupId in taxonomyPermissionState[actionId]) {
      const values = taxonomyPermissionState[actionId][groupId];
      values.forEach((value) => {
        valueLabels.push(vocabularyLabels[value]);
      });
    }
    return valueLabels;
  }

  function updateTaxonomyPermissionState(data) {
    setTaxonomyPermissionState(data);
  }

  return (
    <div>
      {props.action.label}:
      <ul>
        {vocabularyGroups && vocabularyGroups.map((group) => (
          <li key={`${props.action.code}-${group.code}`}>{group.label}: {getData(props.action.code, group.code).join(', ')}</li>
        ))}
      </ul>
      <TaxonomyPermissionChooser actionCode={props.action.code} actionUpdate={updateTaxonomyPermissionState} />
    </div>
  );
}

// PropTypes
const actionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

TaxonomyPermissionAction.propTypes = { action: actionPropTypes };

TaxonomyPermissionAction.defaultProps = { action: {} };

export default TaxonomyPermissionAction;
