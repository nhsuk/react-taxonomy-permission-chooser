import React from 'react';
import PropTypes from 'prop-types';

import TaxonomyPermissionChooser from './TaxonomyPermissionChooser';
import { useTaxonomyContext } from './contexts/TaxonomyContext';


function TaxonomyPermissionAction(props) {
  const { vocabularyGroups, vocabularyLabels, taxonomyPermissionStore } = useTaxonomyContext().state;
  let vocabularyTags = null;

  function renderActionGroupVocabulary(actionId, groupId) {
    const valueLabels = [];
    if (actionId in taxonomyPermissionStore && groupId in taxonomyPermissionStore[actionId]) {
      const values = taxonomyPermissionStore[actionId][groupId];
      values.forEach((value) => {
        valueLabels.push(vocabularyLabels[value]);
      });
    }

    if (valueLabels.length > 0) {
      vocabularyTags = valueLabels.map((voc) => (
        <li key={`${actionId}-${groupId}-${voc}`} className="selected-term">
          <span className="label">{voc}</span>
        </li>
      ));
    } else {
      vocabularyTags = <li className="message">No keywords selected</li>;
    }
    return <ul>{vocabularyTags}</ul>;
  }

  return (
    <div>
      <h2>{props.action.label}</h2>
      <ul>
        {vocabularyGroups && vocabularyGroups.map((group) => (
          <li key={`${props.action.code}-${group.code}`}>{group.label}: {renderActionGroupVocabulary(props.action.code, group.code)}</li>
        ))}
      </ul>
      <TaxonomyPermissionChooser actionCode={props.action.code} />
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
