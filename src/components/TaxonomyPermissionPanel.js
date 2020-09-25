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
  const [permission, setPermission] = useState();
  const [inheritPermission, setInheritPermission] = useState();
  const gloablPermissionField = document.getElementById(props.globalPermissionFieldId);
  const inheritPermissionField = document.getElementById(props.inheritPermissionFieldId);
  const taxonomyPermissionJson = document.getElementById(props.taxonomyPermissionJsonId);
  const actions = props.actions.filter((action) => props.permissionActions.includes(action.code));
  let taxonomyPermissionStore = {};
  const errorMessages = [];
  const vocabularyLabels = {};
  const classes = useStyles();
  let taxonomyPermissionInheritParentLoaded = false;

  // check globalPermissionFieldId exists and get value
  if (props.globalPermissionFieldId) {
    if (gloablPermissionField) {
      if (gloablPermissionField.value && !permission) {
        setPermission(gloablPermissionField.value);
      }
    } else {
      errorMessages.push({
        code: `missing-elt-${props.globalPermissionFieldId}`,
        text: `Missing element id: ${props.globalPermissionFieldId}`,
      });
    }
  } else {
    errorMessages.push({
      code: `missing-id-${props.globalPermissionFieldId}`,
      text: 'Missing globalPermissionFieldId',
    });
  }

  // check inheritPermissionFieldId exists and get value
  if (props.inheritPermissionFieldId) {
    if (inheritPermissionField) {
      if (inheritPermissionField.value && !inheritPermission) {
        setInheritPermission(inheritPermissionField.value);
      }
    } else {
      errorMessages.push({
        code: `missing-elt-${props.inheritPermissionFieldId}`,
        text: `Missing element id: ${props.inheritPermissionFieldId}`,
      });
    }
  } else {
    errorMessages.push({
      code: `missing-id-${props.inheritPermissionFieldId}`,
      text: 'Missing inheritPermissionFieldId',
    });
  }

  // check taxonomyPermissionJsonId exists and get value
  if (props.taxonomyPermissionJsonId) {
    if (taxonomyPermissionJson) {
      if (taxonomyPermissionJson.value) {
        taxonomyPermissionStore = JSON.parse(taxonomyPermissionJson.value);
      }
    } else {
      errorMessages.push({
        code: `missing-elt-${props.taxonomyPermissionJsonId}`,
        text: `Missing element id: ${props.taxonomyPermissionJsonId}`,
      });
    }
  } else {
    errorMessages.push({
      code: `missing-id-${props.taxonomyPermissionJsonId}`,
      text: 'Missing taxonomyPermissionJsonId',
    });
  }

  // get vocabulary labels in context
  props.vocabularyGroups.forEach((group) => {
    group.children.forEach((vocabulary) => {
      vocabularyLabels[vocabulary.code] = vocabulary.label;
    });
  });

  function onChangeGlobalPermission(e) {
    setPermission(e.target.value);
    if (gloablPermissionField) {
      gloablPermissionField.value = e.target.value;
      inheritPermissionField.checked = true;
    }
  }

  function onChangeInheritPermission(e) {
    if (e.target.checked) {
      setInheritPermission('page');
      inheritPermissionField.checked = true;
      inheritPermissionField.value = 'page';
    } else {
      setInheritPermission('none');
      inheritPermissionField.checked = false;
      inheritPermissionField.value = 'none';
    }
  }

  return (
    <>
      {errorMessages.length > 0 && (
        <ul className={classes.errorMessage}>
          {errorMessages.map((msg) => (
            <li key={msg.code}>{msg.text}</li>
          ))}
        </ul>
      )}
      {errorMessages.length === 0 && (
        <>
          {props.permissionType === 'page' && (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          )}
          {props.permissionType === 'model' && (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          )}
          {props.permissionType === 'page' && (
            <div className={classes.globalPermissionsPanel}>
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
                <div className={classes.inheritPermissionPanel}>
                  <label htmlFor="inheritPermission">
                    <input
                      id="inheritPermission"
                      checked={inheritPermission === 'page'}
                      onChange={onChangeInheritPermission}
                      type="checkbox"
                      name="global-inherit-permission"
                    />
                    Inherit permission from another page
                  </label>
                </div>
              )}
              { permission === 'restricted' && inheritPermission === 'page' && props.taxonomyPermissionInheritParent && (
                <div ref={(node) => {
                  if (!taxonomyPermissionInheritParentLoaded) {
                    node.appendChild(props.taxonomyPermissionInheritParent);
                    taxonomyPermissionInheritParentLoaded = true;
                  }
                }}
                />
              )}
            </div>
          )}
          { (permission === 'restricted' || props.permissionType === 'model') && (
            <TaxonomyContext value={{
              vocabularyGroups: props.vocabularyGroups,
              taxonomyPermissionJson,
              vocabularyLabels,
              taxonomyPermissionStore,
            }}
            >
              {props.actions && actions.map((action) => (
                <TaxonomyPermissionAction key={`action-${action.code}`} action={action} />
              ))}
            </TaxonomyContext>
          )}
        </>
      )}
    </>
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
  globalPermissionFieldId: PropTypes.string,
  inheritPermissionFieldId: PropTypes.string,
  taxonomyPermissionJsonId: PropTypes.string,
  taxonomyPermissionInheritParent: PropTypes.instanceOf(Element),
  actions: actionsPropTypes,
  vocabularyGroups: vocabularyGroupsPropTypes,
  permissionType: PropTypes.string,
  permissionActions: PropTypes.arrayOf(PropTypes.string),
};

TaxonomyPermissionPanel.defaultProps = {
  globalPermissionFieldId: null,
  inheritPermissionFieldId: null,
  taxonomyPermissionJsonId: null,
  taxonomyPermissionInheritParent: null,
  actions: [],
  vocabularyGroups: [],
  permissionType: 'page',
  permissionActions: [],
};

export default TaxonomyPermissionPanel;
