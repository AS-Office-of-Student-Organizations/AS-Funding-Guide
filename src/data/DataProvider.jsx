import { useEffect, useState } from 'react';
import { fetchAllDocs } from './useDocs';
import DataContext from './DataContext';
import PropTypes from 'prop-types';

export default function DataProvider({ children }) {
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    fetchAllDocs().then(setDocs);
  }, []);

  return <DataContext.Provider value={docs}>{children}</DataContext.Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
