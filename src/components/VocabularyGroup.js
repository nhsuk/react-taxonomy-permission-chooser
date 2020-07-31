import React from 'react';
import PropTypes from 'prop-types';

import { vocabularyGroupPropTypes } from '../helpers/customPropsType';

function VocabularyGroup(props) {
  // Use the json string data in the dom to define the default checkbox state
  function isChecked(itemCode) {
    if (props.taxonomyPermissionJson) {
      const taxonomyPermissionValues = JSON.parse(props.taxonomyPermissionJson.value);
      if (props.actionCode in taxonomyPermissionValues) {
        return taxonomyPermissionValues[props.actionCode].includes(itemCode);
      }
    }
    return false;
  }

  // Update json string in the dom when user check/uncheck the checkbox
  function updatePermission(e) {
    if (props.taxonomyPermissionJson) {
      const taxonomyPermissionValues = JSON.parse(props.taxonomyPermissionJson.value);
      if (e.target.checked) {
        taxonomyPermissionValues[props.actionCode].push(e.target.value);
      } else {
        taxonomyPermissionValues[props.actionCode] = taxonomyPermissionValues[props.actionCode].filter((item) => item !== e.target.value);
      }
      props.taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionValues);
    }
  }

  return (
    <div>
      <h3>{props.group.label}</h3>
      <p>{props.group.description}</p>
      <ul>
        {props.group.children && props.group.children.map((item) => (
          <>
            <input onChange={updatePermission} value={item.code} type="checkbox" defaultChecked={isChecked(item.code)} />{item.label}
          </>
        ))}
      </ul>
    </div>
  );
}

VocabularyGroup.propTypes = {
  taxonomyPermissionJson: PropTypes.string.isRequired,
  group: vocabularyGroupPropTypes,
  actionCode: PropTypes.string.isRequired,
};

VocabularyGroup.defaultProps = { group: {} };

export default VocabularyGroup;
