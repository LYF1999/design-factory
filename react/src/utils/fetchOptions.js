import { unsafeHeaders } from './headers';

export const postOptions = () => ({
  method: 'POST',
  credentials: 'include',
  headers: unsafeHeaders(),
});


export const putOptions = () => (Object.assign({}, postOptions(), { method: 'PUT' }));
export const patchOptions = () => (Object.assign({}, postOptions(), { method: 'PATCH' }));
export const deleteOptions = () => (Object.assign({}, postOptions(), { method: 'DELETE' }));


export const getOptions = {
  method: 'GET',
  credentials: 'include',
};

