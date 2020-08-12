import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { useTaxonomyContext } from './contexts/TaxonomyContext';

const useStyles = createUseStyles({
  vocabularyGroupSection: {
    '& label': {
      display: 'inline',
      float: 'initial',
      width: '100%',
    },
  },
});

function VocabularyGroup(props) {
  const { taxonomyPermissionStore } = useTaxonomyContext().state;
  const { updatePermission } = useTaxonomyContext().action;
  const classes = useStyles();

  // Use the json string data in the dom to define the default checkbox state
  function isChecked(itemCode) {
    if (props.actionCode in taxonomyPermissionStore && props.group.code in taxonomyPermissionStore[props.actionCode]) {
      return taxonomyPermissionStore[props.actionCode][props.group.code].includes(itemCode);
    }
    return false;
  }

  // Update json string in the dom when user check/uncheck the checkbox
  function updateCheckboxPermission(e) {
    updatePermission(props.actionCode, props.group.code, e.target.value, !e.target.checked);
  }

  return (
    <div className={classes.vocabularyGroupSection}>
      <h2>{props.group.label}</h2>
      <p>{props.group.description}</p>
      <ul>
        {props.group.children && props.group.children.map((item) => (
          <div key={`div-${props.actionCode}-${props.group}-${item.code}`}>
            <input
              key={`checkbox-${props.actionCode}-${props.group}-${item.code}`}
              onChange={updateCheckboxPermission}
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
};

VocabularyGroup.defaultProps = { group: {} };

export default VocabularyGroup;
