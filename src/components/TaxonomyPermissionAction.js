import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import TaxonomyPermissionChooser from './TaxonomyPermissionChooser';
import { useTaxonomyContext } from './contexts/TaxonomyContext';

const useStyles = createUseStyles({
  actionPanel: {
    backgroundColor: '#ddd',
    padding: '20px',
    marginTop: '20px',
  },
  '&.selected-term': {
    border: 'solid thin #333',
    borderRadius: 3,
  },
  tags: {
    padding: 0,
    margin: 0,
    '& li': {
      display: 'inline-flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'stretch',
      margin: '5px 2px',
      fontSize: '1em',
      height: '1.5em',
      padding: 0,
      listStyle: 'none',
      fontFamily: 'sans-serif',
      '&.selected-term': {
        border: 'solid thin #333',
        borderRadius: 3,
      },
      '&.message': { fontWeight: 'bold' },
      '& span.label': {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        flex: '1 1 auto',
        padding: [0, '1em'],
        whitespace: 'nowrap',
        background: '#fff',
      },
    },
  },
});

function TaxonomyPermissionAction(props) {
  const { vocabularyGroups, vocabularyLabels, taxonomyPermissionStore } = useTaxonomyContext().state;
  const classes = useStyles();
  let vocabularyTags = null;

  function renderActionGroupVocabulary(actionId, groupId) {
    const valueLabels = [];
    if (actionId in taxonomyPermissionStore && groupId in taxonomyPermissionStore[actionId]) {
      const values = taxonomyPermissionStore[actionId][groupId];
      values.filter((val) => val !== '_all').forEach((value) => {
        valueLabels.push(vocabularyLabels[value]);
      });
    }

    if (valueLabels.length > 0) {
      vocabularyTags = valueLabels.map((voc) => (
        <li key={`${actionId}-${groupId}-${voc}`} className="selected-term">
          <span className="label">{voc}</span>
        </li>
      ));
    } else {
      vocabularyTags = <li className="message">All</li>;
    }
    return <ul className={classes.tags}>{vocabularyTags}</ul>;
  }

  return (
    <div className={classes.actionPanel}>
      <h2>{props.action.label}</h2>
      <ul>
        {vocabularyGroups && vocabularyGroups.map((group) => (
          <li key={`${props.action.code}-${group.code}`}>{group.label}: {renderActionGroupVocabulary(props.action.code, group.code)}</li>
        ))}
      </ul>
      <TaxonomyPermissionChooser actionCode={props.action.code} />
    </div>
  );
}

// PropTypes
const actionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

TaxonomyPermissionAction.propTypes = { action: actionPropTypes };
TaxonomyPermissionAction.defaultProps = { action: {} };

export default TaxonomyPermissionAction;
