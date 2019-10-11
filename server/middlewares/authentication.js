module.exports = async function(context, authenticator) {
    await authenticator.getUser(context)
}
