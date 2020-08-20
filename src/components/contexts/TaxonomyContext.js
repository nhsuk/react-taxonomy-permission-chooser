import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const context = createContext();
const { Provider } = context;

/**
 * The Taxonomy context, available to all components. Use for user related data
 */
const TaxonomyContext = ({ value, children }) => {
  const [state, dispatch] = useReducer((reducerState, action) => {
    const { taxonomyPermissionStore, taxonomyPermissionJson } = reducerState;
    switch (action.type) {
      case 'ADD':
        taxonomyPermissionStore[action.actionCode] = taxonomyPermissionStore[action.actionCode] || {};
        taxonomyPermissionStore[action.actionCode][action.groupCode] = taxonomyPermissionStore[action.actionCode][action.groupCode] || [];
        if (taxonomyPermissionStore[action.actionCode][action.groupCode].indexOf(action.item) === -1) {
          taxonomyPermissionStore[action.actionCode][action.groupCode].push(action.item);
        }
        taxonomyPermissionStore[action.actionCode][action.groupCode].sort();
        taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionStore);
        return { ...reducerState, taxonomyPermissionStore };
      case 'REMOVE':
        taxonomyPermissionStore[action.actionCode][action.groupCode] = taxonomyPermissionStore[action.actionCode][action.groupCode].filter(
          (item) => item !== action.item,
        );
        if (taxonomyPermissionStore[action.actionCode][action.groupCode].length === 0) {
          delete taxonomyPermissionStore[action.actionCode][action.groupCode];
        }
        if (Object.keys(taxonomyPermissionStore[action.actionCode]).length === 0) {
          delete taxonomyPermissionStore[action.actionCode];
        }
        taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionStore);
        return { ...reducerState, taxonomyPermissionStore };
      case 'REMOVE_ALL_VOCABULARIES':
        delete taxonomyPermissionStore[action.actionCode][action.groupCode];
        if (Object.keys(taxonomyPermissionStore[action.actionCode]).length === 0) {
          delete taxonomyPermissionStore[action.actionCode];
        }
        taxonomyPermissionJson.value = JSON.stringify(taxonomyPermissionStore);
        return { ...reducerState, taxonomyPermissionStore };
      default:
        throw new Error('Unknown action');
    }
  }, value);

  const updatePermission = (actionCode, groupCode, item, remove) => {
    if (remove) {
      dispatch({ type: 'REMOVE', actionCode, groupCode, item });
    } else {
      dispatch({ type: 'ADD', actionCode, groupCode, item });
    }
  };

  const removeAllVocabularies = (actionCode, groupCode) => {
    dispatch({ type: 'REMOVE_ALL_VOCABULARIES', actionCode, groupCode });
  };

  return <Provider value={{ state, action: { updatePermission, removeAllVocabularies } }}>{children}</Provider>;
};

TaxonomyContext.propTypes = {
  value: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

TaxonomyContext.defaultProps = { value: {} };

function useTaxonomyContext() {
  return useContext(context);
}

export { TaxonomyContext, useTaxonomyContext };
