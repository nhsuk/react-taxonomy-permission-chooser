import { createContext } from 'react';

const TaxonomyContext = createContext(
  {
    vocabularyGroups: () => [],
    taxonomyPermissionJson: null,
    vocabularyLabels: {},
    taxonomyPermission: {},
  },
);

export default TaxonomyContext;
