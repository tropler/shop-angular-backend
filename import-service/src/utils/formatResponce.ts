export const formatResponse = <T>(statusCode: number, body?: T) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
    }
}