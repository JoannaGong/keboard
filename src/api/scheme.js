import request from '@/utils/request'

export function setPlans(params) {
  return request({
    url: '/api/plans',
    method: 'post',
    params
  })
}

export function getPlans() {
  return request({
    url: '/api/plans',
    method: 'get'
  })
}

export function setPlan(params) { 
  return request({
    url: '/api/setPlan',
    method: 'post',
    params
  })
}

export function amendPlan(params) { 
  return request({
    url: '/api/plans/'+params.id,
    method: 'patch',
    params
  })
}

export function delPlan(params) { 
  return request({
    url: '/api/plans/'+params.id,
    method: 'delete'
  })
}