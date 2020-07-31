import React, { useState } from 'react';
import PropTypes from 'prop-types';

import VocabularyGroup from './VocabularyGroup';
import { vocabularyGroupsPropTypes } from '../helpers/customPropsType';

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
            <VocabularyGroup actionCode={props.actionCode} taxonomyPermissionJson={props.taxonomyPermissionJson} group={group} />
          ))}
        </>
      )}
    </>
  );
}

TaxonomyPermissionChooser.propTypes = {
  taxonomyPermissionJson: PropTypes.string.isRequired,
  actionCode: PropTypes.string.isRequired,
  vocabularyGroups: vocabularyGroupsPropTypes,
};

TaxonomyPermissionChooser.defaultProps = {
  vocabularyGroups: [],
};

export default TaxonomyPermissionChooser;
