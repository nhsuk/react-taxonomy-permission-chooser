import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import TaxonomyContext from './TaxonomyContext';

function VocabularyGroup(props) {
  const { taxonomyPermissionJson } = useContext(TaxonomyContext);

  // Use the json string data in the dom to define the default checkbox state
  function isChecked(itemCode) {
    if (taxonomyPermissionJson) {
      const taxonomyPermissionValues = JSON.parse(taxonomyPermissionJson.value);
      if (props.actionCode in taxonomyPermissionValues && props.group.code in taxonomyPermissionValues[props.actionCode]) {
        return taxonomyPermissionValues[props.actionCode][props.group.code].includes(itemCode);
      }
    }
    return false;
  }

  // Update json string in the dom when user check/uncheck the checkbox
  function updatePermission(e) {
    if (taxonomyPermissionJson) {
      const taxonomyPermissionValues = JSON.parse(taxonomyPermissionJson.value);
      if (e.target.checked) {
        taxonomyPermissionValues[props.actionCode][props.group.code].push(e.target.value);
      } else {
        taxonomyPermissionValues[props.actionCode][props.group.code] = taxonomyPermissionValues[props.actionCode][props.group.code].filter(
          (item) => item !== e.target.value,
        );
      }
      taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionValues);
      props.actionUpdate(taxonomyPermissionValues);
    }
  }

  return (
    <div>
      <h3>{props.group.label}</h3>
      <p>{props.group.description}</p>
      <ul>
        {props.group.children && props.group.children.map((item) => (
          <div key={`div-${props.actionCode}-${props.group}-${item.code}`}>
            <input
              key={`checkbox-${props.actionCode}-${props.group}-${item.code}`}
              onChange={updatePermission}
              value={item.code}
              type="checkbox"
              defaultChecked={isChecked(item.code)}
            />{item.label}
          </div>
        ))}
      </ul>
    </div>
  );
}

// PropTypes
const vocabularyItemPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
vocabularyItemPropTypes.children = PropTypes.arrayOf(vocabularyItemPropTypes);

const vocabularyGroupPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(vocabularyItemPropTypes),
});

VocabularyGroup.propTypes = {
  group: vocabularyGroupPropTypes,
  actionCode: PropTypes.string.isRequired,
  actionUpdate: PropTypes.func.isRequired,
};

VocabularyGroup.defaultProps = { group: {} };

export default VocabularyGroup;
