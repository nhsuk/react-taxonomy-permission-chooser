import PropTypes from 'prop-types';

const actionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

const actionsPropTypes = PropTypes.arrayOf(actionPropTypes);

const vocabularyItemPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
vocabularyItemPropTypes.children = PropTypes.arrayOf(vocabularyItemPropTypes);

const vocabularyGroupPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(vocabularyItemPropTypes),
});

const vocabularyGroupsPropTypes = PropTypes.arrayOf(vocabularyGroupPropTypes);

export {
  actionsPropTypes,
  actionPropTypes,
  vocabularyGroupsPropTypes,
  vocabularyGroupPropTypes,
};
