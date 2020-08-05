import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TaxonomyPermissionAction from './TaxonomyPermissionAction';
import TaxonomyContext from './TaxonomyContext';

function TaxonomyPermissionPanel(props) {
  const [permission, setPermission] = useState(props.permission);
  const [inheritPermission, setInheritPermission] = useState(props.inheritPermission);
  const gloablPermissionField = document.getElementById(props.globalPermissionFieldId);
  const inheritPermissionField = document.getElementById(props.inheritPermissionFieldId);
  const taxonomyPermissionJson = document.getElementById(props.taxonomyPermissionJsonId);
  const vocabularyLabels = {};
  let taxonomyPermission = {};

  gloablPermissionField.value = permission;
  inheritPermissionField.checked = inheritPermission;

  // initialise json string in the dom if empty
  if (taxonomyPermissionJson) {
    if (taxonomyPermissionJson.value === '') {
      const taxonomyPermissionValues = {};
      props.actions.forEach((action) => {
        taxonomyPermissionValues[action.code] = {};
        props.vocabularyGroups.forEach((group) => {
          taxonomyPermissionValues[action.code][group.code] = [];
        });
      });
      taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionValues);
      taxonomyPermission = taxonomyPermissionValues;
    } else {
      taxonomyPermission = JSON.parse(taxonomyPermissionJson.value);
    }
  }

  // get vocabulary labels in context
  props.vocabularyGroups.forEach((group) => {
    group.children.forEach((vocabulary) => {
      vocabularyLabels[vocabulary.code] = vocabulary.label;
    });
  });

  // Show TaxonomyPermissionAction if restrited permission
  function onChangeGlobalPermission(e) {
    setPermission(e.target.value);
    if (gloablPermissionField) {
      gloablPermissionField.value = permission;
    }
    if (inheritPermissionField) {
      inheritPermissionField.checked = inheritPermission;
    }
  }

  return (
    <div>
      <h1>TaxonomyPermissionPanel</h1>
      <div>
        <input
          onChange={onChangeGlobalPermission}
          type="radio"
          name="global-permission"
          value="public"
          checked={permission === 'public'}
        /> Public
        <input
          onChange={onChangeGlobalPermission}
          type="radio"
          name="global-permission"
          value="restricted"
          checked={permission === 'restricted'}
        />Restricted
      </div>
      { permission === 'restricted' && (
        <>
          <div>
            <input
              checked={inheritPermission}
              onChange={() => setInheritPermission(!inheritPermission)}
              type="checkbox"
              name="global-inherit-permission"
            /> Inherit permission from parent
          </div>
          <TaxonomyContext.Provider value={{
            vocabularyGroups: props.vocabularyGroups,
            taxonomyPermissionJson,
            vocabularyLabels,
            taxonomyPermission,
          }}
          >
            {props.actions && props.actions.map((action) => (
              <TaxonomyPermissionAction key={`action-${action.code}`} action={action} />
            ))}
          </TaxonomyContext.Provider>
        </>
      )}
    </div>
  );
}

// PropTypes
const actionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

const actionsPropTypes = PropTypes.arrayOf(actionPropTypes);

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

const vocabularyGroupsPropTypes = PropTypes.arrayOf(vocabularyGroupPropTypes);

TaxonomyPermissionPanel.propTypes = {
  permission: PropTypes.string,
  inheritPermission: PropTypes.bool,
  globalPermissionFieldId: PropTypes.string,
  inheritPermissionFieldId: PropTypes.string,
  taxonomyPermissionJsonId: PropTypes.string,
  actions: actionsPropTypes,
  vocabularyGroups: vocabularyGroupsPropTypes,
};

TaxonomyPermissionPanel.defaultProps = {
  permission: 'public',
  inheritPermission: false,
  globalPermissionFieldId: null,
  inheritPermissionFieldId: null,
  taxonomyPermissionJsonId: null,
  actions: [],
  vocabularyGroups: [],
};

export default TaxonomyPermissionPanel;
