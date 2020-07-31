import React from 'react';

function VocabularyGroup(props) {
  function isChecked(itemCode) {
    if (props.taxonomyPermissionJson) {
      const taxonomyPermissionValues = JSON.parse(props.taxonomyPermissionJson.value);
      return taxonomyPermissionValues[props.actionCode].includes(itemCode);
    }
    return false;
  }

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

export default VocabularyGroup;
