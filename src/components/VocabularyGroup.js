import React from 'react';

function VocabularyGroup(props) {
  return (
    <div>
      <h3>{props.group.label}</h3>
      <p>{props.group.description}</p>
      <ul>
        {props.group.children && props.group.children.map((item) => (
          <>
            <input value={item.code} type="checkbox" />{item.label}
          </>
        ))}
      </ul>
    </div>
  );
}

export default VocabularyGroup;
