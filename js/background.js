// // 右键菜单获取cookie
// chrome.contextMenus.create({
//     title: "获取cookie - requests",
//     onclick: function () {
//         chrome.cookies.getAll({}, cookies => {
//             sendMessageToContentScript({cmd: 'get_now_domain'}, function (response) {
//                 console.log('来自content的回复：' + response);
//                 // let now_domain = window.location.host.split('.').slice(-2).join('.');
//                 let now_domain = response;
//                 // alert('now_domain' + now_domain)
//                 let res = {};
//                 let res2 = {};
//                 for (let i of cookies) {
//                     if (i['domain'].indexOf(now_domain) !== -1) {
//                         res[i['name']] = i['value'];
//                         res2[i['name']] = i['value'] + '---' + i['domain']
//                     }
//                 }
//
//                 console.log('res2', res2);
//
//                 res = sorted_dict(res);
//                 copy_to_clipboard(JSON.stringify(res, undefined, 4));
//
//                 sendMessageToContentScript({
//                     cmd: 'notify', params: {
//                         message: '复制cookie成功',
//                         status: 'success',
//                         pos: 'top-center',
//                         timeout: 5000
//                     }
//                 })
//
//             });
//
//
//         })
//
//     }
// });

// 右键菜单获取cookies
chrome.contextMenus.create({
    title: "获取Cookies",
    onclick: function () {
        chrome.cookies.getAll({}, cookies => {
            sendMessageToContentScript({cmd: 'get_now_domain'}, function (response) {
                console.log('来自content的回复：' + response);
                // let now_domain = window.location.host.split('.').slice(-2).join('.');
                let now_domain = response;
                // alert('now_domain' + now_domain)
                let res = [];
                for (let i of cookies) {
                    // console.log('i', i);
                    if (i['domain'].indexOf(now_domain) !== -1) {
                        let tmp = {
                            'name': i['name'],
                            'value': i['value'],
                            'domain': i['domain'],
                            // 'secure': i['secure'].toString(),
                            'path': i['path'],
                        };
                        res.push(tmp)
                    }
                }

                console.log('res', res);
                res = sort_dict_list(res, 'name');
                copy_to_clipboard(JSON.stringify(res, undefined, 4));

                sendMessageToContentScript({
                    cmd: 'notify', params: {
                        message: '复制cookie成功',
                        status: 'success',
                        pos: 'top-center',
                        timeout: 5000
                    }
                })

            });


        })

    }
});


// 右键菜单获取localStorage
chrome.contextMenus.create({
    title: "获取localStorage",
    onclick: function () {
        sendMessageToContentScript({cmd: 'get_local_storage'}, function (response) {
            copy_to_clipboard(response);

            sendMessageToContentScript({
                cmd: 'notify', params: {
                    message: '复制localStorage成功',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 5000
                }
            })
        })
    }
});


// 右键菜单获取sessionStorage
chrome.contextMenus.create({
    title: "获取sessionStorage",
    onclick: function () {
        sendMessageToContentScript({cmd: 'get_session_storage'}, function (response) {
            copy_to_clipboard(response);

            sendMessageToContentScript({
                cmd: 'notify', params: {
                    message: '复制sessionStorage成功',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 5000
                }
            })
        })
    }
});

chrome.contextMenus.create({type: 'separator'});


function sendMessageToContentScript(message, callback) {
    // console.log('chrome.tabs', chrome.tabs)
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        // console.log('tabs', tabs)
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
            console.log('response', response)
        });
    });
}
//
// // 右键菜单获取localStorage
// chrome.contextMenus.create({
//     title: "美团爬虫",
//     onclick: function () {
//         console.log(111)
//         sendMessageToContentScript({cmd: 'mei_tuan'}, function (response) {
//             console.log('chrome.windows', chrome.windows)
//
//             _getLastFocused(function (win) {
//                 console.log('win.id', win.id)
//                 chrome.windows.update(win.id, {left: 0, top: 0, height: 900, width: 500})
//             })
//
//         })
//     }
// });
//
//
// function _getLastFocused(callback) {
//     chrome.tabs.query({lastFocusedWindow: true}, function (tabs) {
//         chrome.windows.get(tabs[0].windowId, {populate: true}, callback);
//     })
// }
