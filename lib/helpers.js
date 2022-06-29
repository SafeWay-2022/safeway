import React from 'react';

export const cleanPath = (path) => path.replace('/', '');

export const getTableByRoute = (tables, route) =>
  tables.find(({ path }) => cleanPath(path) === cleanPath(route));

export const getTableById = (tables, targetId) => tables.find(({ id }) => +id === +targetId);

export const withProps = ({ children, currentTable, config, commonTables }) =>
  React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { currentTable, config, commonTables })
      : child,
  );

export const checkUrlOnNearbyEdit = (url) => {
  if (url.includes('nearby')) {
    return '/poi' + url.slice(11)
  } else {
    return url
  }
}

export const handleColorsMapPoint = (element) => {
  const categories = {
    'Accommodation': "#7FFFD4",
    'Any help': 'blue',
    'Border Crossing': '#FF8C00',
    'Children': '#FF1493',
    'Disability support': '#228B22',
    'Clothes': '#00CED1',
    'Finance': '#CD5C5C',
    'Food': '#9400D3',
    'Medical': '#ADD8E6',
    'Mental help': '#800000',
    'Pets': '#00FA9A',
    'Pharmacy': '#7B68EE',
    'Social help': '#FFA500',
    'Transport': '#DA70D6'
  }
  Object.keys(categories)
}