const test = async () => {
    const request = await fetch('http://localhost:3000/api/mobile/test', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    return request.text()
}

export default test