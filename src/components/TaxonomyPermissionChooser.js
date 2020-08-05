import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import VocabularyGroup from './VocabularyGroup';
import TaxonomyContext from './TaxonomyContext';

function TaxonomyPermissionChooser(props) {
  const [showChooser, setShowChooser] = useState(false);
  const { vocabularyGroups } = useContext(TaxonomyContext);

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
          {vocabularyGroups && vocabularyGroups.map((group) => (
            <VocabularyGroup
              key={`voc-${props.actionCode}-${group.code}`}
              actionCode={props.actionCode}
              group={group}
              actionUpdate={props.actionUpdate}
            />
          ))}
        </>
      )}
    </>
  );
}

TaxonomyPermissionChooser.propTypes = {
  actionCode: PropTypes.string.isRequired,
  actionUpdate: PropTypes.func.isRequired,
};

export default TaxonomyPermissionChooser;
