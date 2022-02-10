function formatCreatedAt(timestamp) {
  return `${timestamp.getMonth()}/${timestamp.getDate()}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
}

module.exports = formatCreatedAt;