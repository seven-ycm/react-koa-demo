import request from '../../utils/http'
import { IGetOwnersReq } from './interface'

const api = {
    getOwnersApi: '/api/ownerList',
}

export function getOwners(data?: IGetOwnersReq) {
    return request({
        url: api.getOwnersApi,
        method: 'post',
        data
    })
}
