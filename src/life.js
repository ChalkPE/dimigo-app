const axios = require('axios')
const h = token => ({ Authorization: `Bearer ${token}` })

const authUrl = 'https://api.dimigo.life/users/login'
const applyUrl = 'https://api.dimigo.life/service/app/apply/1'

exports.getToken = (id, pwd) => axios
  .post(authUrl, { id, pwd })
  .then(res => res.data.token)

exports.hasApplied = token => axios
  .get(applyUrl + '/me', { headers: h(token) })
  .then(res => res.data.msg)
  .catch(err => err.response ? err.response.data.msg : '알 수 없는 오류가 발생했습니다.')
