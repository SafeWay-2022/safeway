import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import { API_HOST } from '../config';
import { getToken } from '../lib/auth';
import { mapServerTableToUIData } from '../components/ui-components/Inputs/mappers';

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

export const checkUrlOnSearchEdit = (url) => {
  if (url.includes('search')) {
    return '/poi' + url.slice(11);
  } else {
    return url;
  }
};

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
    return 'green';
  } else if (element.categories.includes('Any help')) {
    return 'blue';
  } else if (element.categories.includes('Border Crossing')) {
    return '#FF8C00';
  } else if (element.categories.includes('Children')) {
    return '#FF1493';
  } else if (element.categories.includes('Disability support')) {
    return '#228B22';
  } else if (element.categories.includes('Clothes')) {
    return '#00CED1';
  } else if (element.categories.includes('Finance')) {
    return '#CD5C5C';
  } else if (element.categories.includes('Food')) {
    return '#9400D3';
  } else if (element.categories.includes('Medical')) {
    return '#ADD8E6';
  } else if (element.categories.includes('Mental help')) {
    return '#800000';
  } else if (element.categories.includes('Pets')) {
    return '#00FA9A';
  } else if (element.categories.includes('Pharmacy')) {
    return '#7B68EE';
  } else if (element.categories.includes('Social help')) {
    return '#FFA500';
  } else if (element.categories.includes('Transport')) {
    return '#DA70D6';
  } else {
    return 'blue';
  }
};
export const initialPoint = {
  address: null,
  admin: null,
  categories: [],
  city: null,
  country: '',
  description: null,
  email: null,
  languages: null,
  geo: { lg: undefined, lat: undefined, type: null },
  messenger: null,
  name: '',
  open_hours: null,
  organizations: null,
  phone: null,
  socialmedia: null,
  telegram: null,
  url: null,
  whatsapp: null,
  contact_person: null,
};
export const initialOrg = {
  name: '',
  email: '',
  phone: '',
  url: '',
  address: '',
  city: '',
  country: '',
  contact_person: '',
  socialmedia: '',
  messenger: '',
  telegram: '',
  whatsapp: '',
  categories: [],
  languages: [],
  members: [],
};

export const registerUser = async (_, body) => {
  try {
    await axios.post(API_HOST + '/aaa/register', body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    message.success(`User ${body.username} created`);
  } catch (e) {
    throw e;
  }
};

export const createNeed = async (_, body) => {
  try {
    await axios.post(
      API_HOST + '/need/',
      {
        description: body.description,
        category: body.category,
        latilong: [body.geo.lat, body.geo.lg],
        country: body.country,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    message.success(`Need ${body.name} created`);
  } catch (e) {
    throw e;
  }
};

export const createCommon = async (_, body) => {
  try {
    await axios.post(API_HOST + '/common/', body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    message.success(`Category ${body.name} created`);
  } catch (e) {
    throw e;
  }
};

export const deleteOrg = async (id, refetch) => {
  try {
    await axios.delete(API_HOST + `/org/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    refetch();
    message.success('Organization deleted');
  } catch (e) {
    throw e;
  }
};

export const updateOrg = async (id, body) => {
  try {
    await axios.put(
      API_HOST + '/org/' + id,
      {
        categories: body.categories,
        members: body.members,
        phone: body.phone,
        admin: body.admin,
        email: body.email,
        url: body.url,
        approved: body.approved,
        country: body.country,
        city: body.city,
        address: body.address,
        name: body.name,
        messenger: body.messenger,
        telegram: body.telegram,
        whatsapp: body.whatsapp,
        contact_person: body.contact_person,
        socialmedia: body.socialmedia,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    message.success(`Organization ${body.name} updated`);
  } catch (e) {
    throw e;
  }
};

export const createOrg = async (_, body) => {
  try {
    await axios.post(API_HOST + '/org/', body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    message.success(`Organization ${body.name} created`);
  } catch (e) {
    throw e;
  }
};

export const updatePoint = async (id, body) => {
  try {
    await axios.put(
      API_HOST + `/poi/${id}`,
      {
        description: body.description,
        categories: body.categories,
        organizations: body.organizations,
        phone: body.phone,
        email: body.email,
        url: body.url,
        approved: body.approved,
        active: body.active,
        latilong: [body.geo.lat, body.geo.lg],
        name: body.name,
        messenger: body.messenger,
        country: body.country,
        city: body.city,
        address: body.address,
        contact_person: body.contact_person,
        languages: body.languages,
        admin: body.admin,
        open_hours: body.open_hours,
        socialmedia: body.socialmedia,
        telegram: body.telegram,
        whatsapp: body.whatsapp,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    message.success(`Point ${body.name} updated`);
  } catch (e) {
    throw e;
  }
};

export const createPoint = async (_, body) => {
  try {
    const response = await axios.post(
      API_HOST + '/poi/',
      {
        description: body.description,
        categories: body.categories,
        organizations: body.organizations,
        phone: body.phone,
        email: body.email,
        url: body.url,
        latilong: [body.geo.lat, body.geo.lg],
        name: body.name,
        country: body.country,
        city: body.city,
        address: body.address,
        contact_person: body.contact_person,
        languages: body.languages,
        admin: body.admin,
        open_hours: body.open_hours,
        socialmedia: body.socialmedia,
        messenger: body.messenger,
        telegram: body.telegram,
        whatsapp: body.whatsapp,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    message.success(`Point ${body.name} created`);
  } catch (e) {
    throw e;
  }
};

export const deletePoint = async (id, refetch) => {
  try {
    await axios.delete(API_HOST + `/poi/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    refetch();
    message.success('Point deleted');
  } catch (e) {
    throw e;
  }
};

export const getTableFetch = (url) => async (params) => {
  try {
    const result = await axios(API_HOST + url, {
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const { data } = result;

    const dataArray = Array.isArray(data) ? data : data.items;

    return {
      total: data?.total,
      skip: data?.skip,
      list: mapServerTableToUIData(dataArray),
    };
  } catch (e) {
    message.error(e.message);
    throw e;
  }
};

export const resetPasswordRequest = async ({ email }) => {
  try {
    const result = await axios.get(`${API_HOST}/email/reset-password-request/?email=${email}`);
    return result;
  } catch (e) {
    message.error(e.message);
  }
};

export const changePasswordRequest = async (body) => {
  try {
    const result = await axios.post(
      API_HOST + '/email/change-password/',
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    console.log(result);
    return result;
  } catch (e) {
    message.error(e.message);
  }
};
