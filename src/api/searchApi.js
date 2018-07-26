import http from './_baseApi';

export const search = ({ q, type, page }) => {
  return http.get('search/new', {
    params: { q, type, page },
  });
}

export const getAllBangumi = () => {
  return http.get('search/bangumis')
}
