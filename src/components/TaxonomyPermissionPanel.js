import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import TaxonomyPermissionAction from './TaxonomyPermissionAction';
import { TaxonomyContext } from './contexts/TaxonomyContext';

const useStyles = createUseStyles({
  globalPermissionsPanel: {
    backgroundColor: '#ddd',
    padding: '20px',
    '& label': {
      display: 'inline',
      float: 'initial',
      width: '100%',
    },
  },
  inheritPermissionPanel: { marginTop: '20px' },
  errorMessage: {
    backgroundColor: '#f5d6d7',
    borderRadius: '3px',
    padding: '20px',
  },
});

function TaxonomyPermissionPanel(props) {
  const [permission, setPermission] = useState(props.permission);
  const [inheritPermission, setInheritPermission] = useState(props.inheritPermission);
  const gloablPermissionField = document.getElementById(props.globalPermissionFieldId);
  const inheritPermissionField = document.getElementById(props.inheritPermissionFieldId);
  const taxonomyPermissionJson = document.getElementById(props.taxonomyPermissionJsonId);
  let taxonomyPermissionStore = {};
  const vocabularyLabels = {};
  const classes = useStyles();

  gloablPermissionField.value = permission;
  inheritPermissionField.checked = inheritPermission;

  if (taxonomyPermissionJson && taxonomyPermissionJson.value) {
    taxonomyPermissionStore = JSON.parse(taxonomyPermissionJson.value);
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div>
        <label htmlFor="radio_global_permission">Global permission:
          <div>
            <label htmlFor="radio_global_permission_public">
              <input
                id="radio_global_permission_public"
                onChange={onChangeGlobalPermission}
                type="radio"
                name="global-permission"
                value="public"
                checked={permission === 'public'}
              /> Public
            </label>
            <label htmlFor="radio_global_permission_restricted">
              <input
                id="radio_global_permission_restricted"
                onChange={onChangeGlobalPermission}
                type="radio"
                name="global-permission"
                value="restricted"
                checked={permission === 'restricted'}
              />Restricted
            </label>
          </div>
        </label>
        { permission === 'restricted' && (
          <div>
            <label htmlFor="inheritPermission">
              <input
                id="inheritPermission"
                checked={inheritPermission}
                onChange={() => setInheritPermission(!inheritPermission)}
                type="checkbox"
                name="global-inherit-permission"
              />
              Inherit permission from parent
            </label>
          </div>
        )}
      </div>
      { permission === 'restricted' && (
        <TaxonomyContext value={{
          vocabularyGroups: props.vocabularyGroups,
          taxonomyPermissionJson,
          vocabularyLabels,
          taxonomyPermissionStore,
        }}
        >
          {props.actions && props.actions.map((action) => (
            <TaxonomyPermissionAction key={`action-${action.code}`} action={action} />
          ))}
        </TaxonomyContext>
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
