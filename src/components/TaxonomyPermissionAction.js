import React from 'react';
import PropTypes from 'prop-types';

import TaxonomyPermissionChooser from './TaxonomyPermissionChooser';
import { actionPropTypes, vocabularyGroupsPropTypes } from '../helpers/customPropsType';

function TaxonomyPermissionAction(props) {
  return (
    <div>
      {props.action.label}:
      <ul>
        {props.vocabularyGroups && props.vocabularyGroups.map((group) => (
          <li key={`${props.action.code}-${group.code}`}>{group.label}:</li>
        ))}
      </ul>
      <TaxonomyPermissionChooser
        actionCode={props.action.code}
        taxonomyPermissionJson={props.taxonomyPermissionJson}
        vocabularyGroups={props.vocabularyGroups}
      />
    </div>
  );
}

TaxonomyPermissionAction.propTypes = {
  taxonomyPermissionJson: PropTypes.string.isRequired,
  action: actionPropTypes,
  vocabularyGroups: vocabularyGroupsPropTypes,
};

TaxonomyPermissionAction.defaultProps = {
  action: {},
  vocabularyGroups: [],
};

export default TaxonomyPermissionAction;
