import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TaxonomyPermissionAction from './TaxonomyPermissionAction';

function TaxonomyPermissionPanel(props) {
  const [permission, setPermission] = useState(props.permission);
  const [inheritPermission, setInheritPermission] = useState(props.inheritPermission);

  function onChangeGlobalPermission(e) {
    setPermission(e.target.value);
  }

  return (
    <div>
      <h1>TaxonomyPermissionPanel</h1>
      <div>
        <input onChange={onChangeGlobalPermission} type="radio" name="global-permission" value="public" checked={permission === 'public'} /> Public
        <input onChange={onChangeGlobalPermission} type="radio" name="global-permission" value="restricted" checked={permission === 'restricted'} />Restricted
      </div>
      { permission === 'restricted' && (
        <>
          <div>
            <input checked={inheritPermission} onChange={() => setInheritPermission(!inheritPermission)} type="checkbox" name="global-inherit-permission" /> Inherit permission from parent
          </div>
          {props.actions && props.actions.map((action) => (
            <TaxonomyPermissionAction action={action} vocabularyGroups={props.vocabularyGroups} />
          ))}
        </>
      )}
    </div>
  );
}

TaxonomyPermissionPanel.propTypes = {
  permission: PropTypes.string,
  inheritPermission: PropTypes.bool,
  // TO DO
  // vocabylaryGroups: PropTypes.shape({}).isRequired,
};

TaxonomyPermissionPanel.defaultProps = {
  permission: 'public',
  inheritPermission: false,
};

export default TaxonomyPermissionPanel;
