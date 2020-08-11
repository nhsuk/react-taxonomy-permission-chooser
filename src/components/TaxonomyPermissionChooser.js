import React, { useState } from 'react';
import PropTypes from 'prop-types';

import VocabularyGroup from './VocabularyGroup';
import { useTaxonomyContext } from './contexts/TaxonomyContext';

function TaxonomyPermissionChooser(props) {
  const [showChooser, setShowChooser] = useState(false);
  const { vocabularyGroups } = useTaxonomyContext().state;

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
            />
          ))}
        </>
      )}
    </>
  );
}

TaxonomyPermissionChooser.propTypes = { actionCode: PropTypes.string.isRequired };

export default TaxonomyPermissionChooser;
