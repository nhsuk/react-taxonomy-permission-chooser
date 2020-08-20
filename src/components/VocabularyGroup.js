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
  const { updatePermission, removeAllVocabularies } = useTaxonomyContext().action;
  const classes = useStyles();
  let checkedCheckboxesCount = 0;

  // Use the json string data in the dom to define the default checkbox state
  function isChecked(itemCode) {
    if (props.actionCode in taxonomyPermissionStore && props.group.code in taxonomyPermissionStore[props.actionCode]) {
      if (taxonomyPermissionStore[props.actionCode][props.group.code].includes(itemCode)) {
        checkedCheckboxesCount += 1;
        return true;
      }
    }
    return false;
  }

  // Use the json string data in the dom to define the default 'all' checkbox state
  function isAllChecked() {
    if (checkedCheckboxesCount > 0) {
      return false;
    }
    return true;
  }

  // Update json string in the dom when user check/uncheck the checkbox
  function updateCheckboxPermission(e) {
    updatePermission(props.actionCode, props.group.code, e.target.value, !e.target.checked);
    if (e.target.checked) {
      checkedCheckboxesCount += 1;
      document.getElementById(`checkbox-${props.actionCode}-${props.group.code}-all`).checked = false;
    } else {
      checkedCheckboxesCount -= 1;
      document.getElementById(`checkbox-${props.actionCode}-${props.group.code}-all`).checked = isAllChecked();
    }
  }

  // Update json string in the dom when user check/uncheck the checkbox
  function updateCheckboxAllPermission(e) {
    if (!e.target.checked) {
      e.target.checked = true;
      e.preventDefault();
    } else {
      props.group.children.forEach((item) => {
        document.getElementById(`checkbox-${props.actionCode}-${props.group.code}-${item.code}`).checked = false;
      });
    }
    removeAllVocabularies(props.actionCode, props.group.code);
  }

  return (
    <div className={classes.vocabularyGroupSection}>
      <h2>{props.group.label}</h2>
      <p>{props.group.description}</p>
      <ul>
        <div key={`div-${props.actionCode}-${props.group.code}-all`}>
          <label htmlFor={`checkbox-${props.actionCode}-${props.group.code}-all`}>
            <input
              id={`checkbox-${props.actionCode}-${props.group.code}-all`}
              onChange={updateCheckboxAllPermission}
              type="checkbox"
              defaultChecked={isAllChecked(props.group.code)}
            /> All
          </label>
        </div>
        {props.group.children && props.group.children.map((item) => (
          <div key={`div-${props.actionCode}-${props.group.code}-${item.code}`}>
            <label htmlFor={`checkbox-${props.actionCode}-${props.group.code}-${item.code}`}>
              <input
                id={`checkbox-${props.actionCode}-${props.group.code}-${item.code}`}
                onChange={updateCheckboxPermission}
                value={item.code}
                type="checkbox"
                defaultChecked={isChecked(item.code)}
              /> {item.label}
            </label>
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
