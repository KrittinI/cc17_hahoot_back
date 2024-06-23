const verifyService = {}

verifyService['044aeeb0-fbc6-4d9f-aa30-96bc802f4542'] = '{\"email\":\"krittin.ikk@gmail.com\",\"password\":\"$2a$10$wI/dyfu74.t4kiu.ZDkkT.xYY1gvQc5nfbLXfOIb8pL45AbWouA9O\"}'

verifyService.createVerfiId = (id, data) => {
    return { id: id, data: data }
}

verifyService.findDataById = (id) => {
    return verifyService[id]
}

module.exports = verifyService