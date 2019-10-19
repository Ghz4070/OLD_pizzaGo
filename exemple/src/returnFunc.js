exports.success = (success) => {
    return {
        "status": "success",
        "result": success
    }
}
exports.error = (error) => {
    return {
        "status": "error",
        "result": error
    }
}