const initialState = {
  dataSource: [],
  loading: false,
  total: 0,
  row: 5,
  page: 1,
  more: true,
};

const list = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER_LIST_START':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_USER_LIST_FAIL':
      return {
        ...state,
        loading: false
      };
    case 'FETCH_USER_LIST_SUCCESS':
      if (payload.result.length >= state.row) {
        return {
          ...state,
          dataSource: state.dataSource.concat(payload.result),
          total: payload.total,
          page: state.page + 1,
          loading: false,
          more: true
        };
      } else {
        return {
          ...state,
          dataSource: payload.result,
          total: payload.total,
          page: state.page + 1,
          loading: false,
          more: false
        };
      }
    default:
      return state;
  }
};

export default list;
