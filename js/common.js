/* 请求数据 */

/* var visitPort = {
    URL: "http://cdb-api-demo.isunn.cn", //接口地址
    //设置请求头
    Headers: {
        "Terminal": "Agent",
        "Authorization": "DUylucNvcklKhfDk0FkBkPNW"
    },
    //公共参数
    commonData: {
        "sign": "",
        "language": "zh_HK",
        "timestamp": ""
    }

}
 */

$.http = {
    env: "test",
    terminal: "Agent",
    authorization: {
        "test": {
            "Authorization": "LtYJ8agBzG4vi9e7mQrm2BuP",
            "apiSecret": "l9uwRw8Vhc0n1tSbPJvMSojUIUtJ1VNXD14FCmZEMbtfbW0Yb66HGdqUF6rjpO51"
        },
        "pre": {
            "Authorization": "LtYJ8agBzG4vi9e7mQrm2BuP",
            "apiSecret": "l9uwRw8Vhc0n1tSbPJvMSojUIUtJ1VNXD14FCmZEMbtfbW0Yb66HGdqUF6rjpO51"
        },
        "prod": {
            "Authorization": "LtYJ8agBzG4vi9e7mQrm2BuP",
            "apiSecret": "l9uwRw8Vhc0n1tSbPJvMSojUIUtJ1VNXD14FCmZEMbtfbW0Yb66HGdqUF6rjpO51"
        }
    },
    baseUrl: {
        "test": "http://cdb-api-demo.isunn.cn",
        "pre": "http://cdb-api-pre.isunn.cn:8095",
        "prod": "http://api.chachastation.com"
    },
    // GET请求
    get: function (option) {
        option.method = "GET";
        option.data = $.http.sign(option.data);
        $.http.ajax(option);
    },
    // POST请求
    post: function (option) {
        option.method = "POST";
        option.data = $.http.sign(option.data);
        $.http.ajax(option);
    },
    // POST请求
    put: function (option) {
        option.method = "PUT";
        option.data = $.http.sign(option.data);
        option.url += "?";
        for (var i in option.data) {
            option.url += i + "=" + option.data[i] + "&";
        }
        option.data = {};
        $.http.ajax(option);
    },
    // 签名
    sign: function (data) {
        data["timestamp"] = '';
        data["sign"] = '';
        var secretString = "";
        var keys = [];
        for (var key in data) {
            if (undefined != data[key] && "" != data[key]) {
                keys.push(key);
            }
        }

        for (var i = 0; i < keys.length - 1; i++) {
            for (var j = i + 1; j < keys.length; j++) {
                if (keys[i] > keys[j]) {
                    var temp = keys[i];
                    keys[i] = keys[j];
                    keys[j] = temp;
                }
            }
        }

        for (var i in keys) {
            secretString += keys[i] + "=" + encodeURI(data[keys[i]]) + "&";
        }

        var timestamp = new Date().getTime();

        // 拼接时间戳
        secretString += "timestamp=" + timestamp;

        // HmacSHA256加密
        var hash = CryptoJS.HmacSHA256(secretString, $.http.authorization[$.http.env].apiSecret) + "";

        data["timestamp"] = timestamp;
        data["sign"] = hash.toUpperCase();

        return data;
    },
    // ajax请求
    ajax: function (option) {
        $.ajax({
            headers: {
                "Terminal": $.http.terminal,
                "Authorization": $.http.authorization[$.http.env].Authorization
            },
            url: $.http.baseUrl[$.http.env] + option.url,
            data: option.data,
            type: option.method,
            dataType: "json",
            success: function (res) {
                option.success(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 错误实现
            }
        });
    }
};

//获取url上参数的方法
function getUrlRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str.indexOf("&") != -1) {
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        } else {
            var key = str.substring(0, str.indexOf("="));
            var value = str.substr(str.indexOf("=") + 1);
            theRequest[key] = decodeURI(value);
        }
    }
    return theRequest;
}