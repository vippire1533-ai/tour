const queryUtils = {
  createSelectQuery: (cols = '*', table, conditions) => {
    const filterString = conditions ? `where ${ conditions }` : '';
    return `select ${ cols } from	${ table } ${ filterString }`;
  },
  createUpdateQuery: () => {},
  createDeleteQuery: () => {},
};

export default queryUtils;