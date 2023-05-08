export default class ApiService {
  constructor(apiBase, t) {
    this._apiBase = apiBase;
    this._translate = t;
  }
  getResource = async (url, query, method = 'GET', body, headers = {}) => {
    const absUrl = new URL(this._apiBase);
    const res = await fetch(absUrl, {
      // credentials: 'include',
      method,
      body,
      headers: {
        ...headers,
      },
    });
    const contentType = res.headers.get('Content-Type');
    const checkRes = async (type) => {
      const resData = type.includes('application/json')
        ? await res.json()
        : await res.blob();
      if (res.ok) return resData?.data ? resData.data : resData;
      if (!res.ok) {
        alert('error');
      }
      return null;
    };
    return checkRes(contentType);
  };
  getAllItems = async (query) => this.getResource('', query);
}
