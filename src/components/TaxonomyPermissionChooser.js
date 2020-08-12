import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import VocabularyGroup from './VocabularyGroup';
import { useTaxonomyContext } from './contexts/TaxonomyContext';

const useStyles = createUseStyles({
  modalBackground: {
    background: '#000',
    height: '100%',
    opacity: '0.8',
    position: 'fixed',
    right: '0',
    top: '0',
    width: '100%',
    zIndex: '98',
  },
  modalBox: {
    background: '#fff',
    border: '1px solid #000',
    borderRadius: 3,
    maxHeight: '80%',
    overflowY: 'auto',
    padding: '20px',
    position: 'fixed',
    right: 'calc(50% - 200px)',
    top: '50px',
    width: '400px',
    zIndex: '99',
    '& .closeBtn': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      width: 'initial',
    },
  },
  btn: { width: 'initial' },
});

function TaxonomyPermissionChooser(props) {
  const [showChooser, setShowChooser] = useState(false);
  const { vocabularyGroups } = useTaxonomyContext().state;
  const classes = useStyles();

  function toggleChooser() {
    setShowChooser(!showChooser);
  }

  return (
    <>
      { !showChooser && (
        <input className={classes.btn} onClick={toggleChooser} type="button" value="Edit" />
      )}
      { showChooser && (
        <>
          <div className={classes.modalBackground} />
          <div className={classes.modalBox}>
            <input onClick={toggleChooser} className={`${classes.btn} closeBtn`} type="button" value="Close" />
            {vocabularyGroups && vocabularyGroups.map((group) => (
              <VocabularyGroup
                key={`voc-${props.actionCode}-${group.code}`}
                actionCode={props.actionCode}
                group={group}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

TaxonomyPermissionChooser.propTypes = { actionCode: PropTypes.string.isRequired };

export default TaxonomyPermissionChooser;
