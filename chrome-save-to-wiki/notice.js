/**
 * 显示一个桌面通知
 * @param {*} title 
 * @param {*} content 
 * @param {*} duration 
 * @param {*} callback 
 */
const notice = (title, content, duration = 8000, noticeId) => {
  console.log('调用了notice')
  if (window.webkitNotifications) {
    const notification = window.webkitNotifications.createNotification(IMG_URL, title, content)
    notification.show()

    setTimeout(function () { notification.cancel() }, duration)// 设置3秒后，将桌面通知dismiss
  } else if (chrome.notifications) {
    var opt = {
      type: 'basic',
      title,
      message: content,
      iconUrl: IMG_URL,
      requireInteraction: true,
    }
    chrome.notifications.create(noticeId, opt)
    chrome.notifications.onClicked.addListener(function (id) {
      if (!noticeId) {
        window.open('https://www.yuque.com/chichichichibupang/uuz2cb')
      } else {
        window.open(id)
      }

      chrome.notifications.clear(id, () => {
        console.log('清除弹窗', id)
      })
    })
  } else {
    alert('亲，你的浏览器不支持消息通知窗口啊！')
  }
}

/**
 * 将data数据以桌面通知的方式显示给用户
 */
export const showNotice = (data, duration = 8000) => {
  let title = '链接分享成功'
  let content = `您可以点击本通知来查看页面`
  if (!data) {
    console.error('没有取到有效的链接！')
    title = `链接分享失败`
    content = `没有取到有效的链接！`
  }

  notice(title, content, duration, data)
}


