import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TaxonomyPermissionAction from './TaxonomyPermissionAction';

function TaxonomyPermissionPanel(props) {
  const [permission, setPermission] = useState(props.permission);
  const [inheritPermission, setInheritPermission] = useState(props.inheritPermission);

  const gloablPermissionField = document.getElementById(props.globalPermissionFieldId);
  const inheritPermissionField = document.getElementById(props.inheritPermissionFieldId);
  const taxonomyPermissionJson = document.getElementById(props.taxonomyPermissionJsonId);

  gloablPermissionField.value = permission;
  inheritPermissionField.checked = inheritPermission;

  if (taxonomyPermissionJson) {
    if (taxonomyPermissionJson.value === '') {
      const taxonomyPermissionValues = {};
      props.actions.forEach((action) => {
        taxonomyPermissionValues[action.code] = [];
      });
      taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionValues);
    }
  }

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
          {props.actions && props.actions.map((action) => (
            <TaxonomyPermissionAction taxonomyPermissionJson={taxonomyPermissionJson} action={action} vocabularyGroups={props.vocabularyGroups} />
          ))}
        </>
      )}
    </div>
  );
}

TaxonomyPermissionPanel.propTypes = {
  permission: PropTypes.string,
  inheritPermission: PropTypes.bool,
  globalPermissionFieldId: PropTypes.string,
  inheritPermissionFieldId: PropTypes.string,
  // TO DO
  // vocabylaryGroups: PropTypes.shape({}).isRequired,
};

TaxonomyPermissionPanel.defaultProps = {
  permission: 'public',
  inheritPermission: false,
  globalPermissionFieldId: null,
  inheritPermissionFieldId: null,
};

export default TaxonomyPermissionPanel;
