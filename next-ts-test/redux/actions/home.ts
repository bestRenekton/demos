export function fetchUserListDataStart() {
  return {
    type: 'FETCH_USER_LIST_START',
  };
}
export function fetchUserListData(payload: any) {
  return {
    type: 'FETCH_USER_LIST',
    payload
  };
}

export function fetchUserListDataSuccess(result: Array<number>, total: number) {
  return {
    type: 'FETCH_USER_LIST_SUCCESS',
    payload: {
      result,
      total,
    }
  };
}

export function fetchUserListDataFali() {
  return {
    type: 'FETCH_USER_LIST_FAIL',
  };
}