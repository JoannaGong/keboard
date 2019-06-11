import request from '@/utils/request'

export function setPlans(params) {
  return request({
    url: '/plans',
    method: 'post',
    params
  })
}

export function getPlans() {
  return request({
    url: '/plans',
    method: 'get'
  })
}
export function setPlan(params) { 
  return request({
    url: '/setPlan',
    method: 'post',
    params
  })
}

export function amendPlan(params) { 
  return request({
    url: '/plans/'+params.id,
    method: 'patch',
    params
  })
}

export function delPlan(params) { 
  return request({
    url: '/plans/'+params.id,
    method: 'delete'
  })
}