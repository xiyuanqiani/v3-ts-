import ysRequest from '..'
export function getEntireRole() {
  return ysRequest.post({
    url: 'role/list'
  })
}

export function getEntireDepartment() {
  return ysRequest.post({
    url: 'department/list'
  })
}

export function getEntireMenuList() {
  return ysRequest.post({
    url: 'menu/list'
  })
}
