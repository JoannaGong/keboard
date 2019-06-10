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