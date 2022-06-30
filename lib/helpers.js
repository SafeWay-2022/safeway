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
  // const categories = {
  //   'Accommodation': "#7FFFD4",
  //   'Any help': 'blue',
  //   'Border Crossing': '#FF8C00',
  //   'Children': '#FF1493',
  //   'Disability support': '#228B22',
  //   'Clothes': '#00CED1',
  //   'Finance': '#CD5C5C',
  //   'Food': '#9400D3',
  //   'Medical': '#ADD8E6',
  //   'Mental help': '#800000',
  //   'Pets': '#00FA9A',
  //   'Pharmacy': '#7B68EE',
  //   'Social help': '#FFA500',
  //   'Transport': '#DA70D6'
  // }
  if (element.categories.includes('Accommodation')) {
    return "green"
  } else if (element.categories.includes('Any help')) {
    return 'blue'
  } else if (element.categories.includes('Border Crossing')) {
    return '#FF8C00'
  } else if (element.categories.includes('Children')) {
    return '#FF1493'
  } else if (element.categories.includes('Disability support')) {
    return '#228B22'
  } else if (element.categories.includes('Clothes')) {
    return '#00CED1'
  } else if (element.categories.includes('Finance')) {
    return '#CD5C5C'
  } else if (element.categories.includes('Food')) {
    return '#9400D3'
  } else if (element.categories.includes('Medical')) {
    return '#ADD8E6'
  } else if (element.categories.includes('Mental help')) {
    return '#800000'
  } else if (element.categories.includes('Pets')) {
    return '#00FA9A'
  } else if (element.categories.includes('Pharmacy')) {
    return '#7B68EE'
  } else if (element.categories.includes('Social help')) {
    return '#FFA500'
  } else if (element.categories.includes('Transport')) {
    return '#DA70D6'
  } else {
    return 'blue'
  }
}