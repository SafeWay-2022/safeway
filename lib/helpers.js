import React from 'react';

export const cleanPath = (path) => path.replace('/', '');

export const getTableByRoute = (tables, route) =>
  tables.find(({ path }) => cleanPath(path) === cleanPath(route));

export const getTableById = (tables, targetId) => tables.find(({ id }) => id === targetId);

export const withProps = ({ children, currentTable, config, commonTables }) =>
  React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { currentTable, config, commonTables })
      : child,
  );
