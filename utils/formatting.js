function formatCreatedAt(timestamp) {
  return `${timestamp.getMonth()}/${timestamp.getDate()}/${timeStamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
}

module.exports = formatCreatedAt;