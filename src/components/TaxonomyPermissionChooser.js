import React, { useState } from 'react';

import VocabularyGroup from './VocabularyGroup';

function TaxonomyPermissionChooser(props) {
  const [showChooser, setShowChooser] = useState(false);

  function toggleChooser() {
    setShowChooser(!showChooser);
  }

  return (
    <>
      { !showChooser && (
        <input onClick={toggleChooser} type="button" value="Edit" />
      )}
      { showChooser && (
        <>
          <h1>TaxonomyPermissionChooser</h1>
          <input onClick={toggleChooser} type="button" value="Close" />
          {props.vocabularyGroups && props.vocabularyGroups.map((group) => (
            <VocabularyGroup action={props.action} taxonomyPermissionJson={props.taxonomyPermissionJson} group={group} />
          ))}
        </>
      )}
    </>
  );
}

export default TaxonomyPermissionChooser;
