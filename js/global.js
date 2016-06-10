//获取地址栏参数
$.urlParam = function (name) {

    var result = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ''])[1];
    return decodeURIComponent(result);

};

//冒泡小提示
function tipMsg(obj, text) {//tipMsg($("#promptTip"), "文本")
    obj.text(text);
    var w = parseInt($(window).width());
    var t = parseInt(obj.width());
    obj.css("margin-left", (w - t) / 2 + "px");
    obj.stop(true, true).fadeIn('slow').fadeOut(5000);
};

//限制输入字数
function textLimit(obj) {
    obj.keyup(function () {
        var area = $(this);
        var max = parseInt(area.attr("maxlength"), 10);
        if (max > 0) {
            if (area.val().length > max) {
                area.val(area.val().substr(0, max));
            }
        }
    });
}

//限制字符个数
function textWord(obj, numText) {

    //obj.each(function(){
    if (obj.text().length > numText) {
        obj.text(obj.text().substring(0, numText));
        obj.html(obj.html() + '…');
    }

    //});

}

//文本域输入动态显示字数
function commodityChange(obj, cont) {

    obj.keyup(function () {

        var area = $(this);
        var max = parseInt(area.attr("maxlength"), 10);

        if (max > 0) {
            if (area.val().length > max) {
                area.val(area.val().substr(0, max));
            }
        }

        var curLength = area.val().length;

        if (curLength > max) {
            var num = area.val().substr(0, 100);
            area.val(num);
        } else {
            cont.text(max - area.val().length);
        }

    });

}


//显示/关闭下拉框
function showCancelFn(obj, box, x) {

    if (!(obj)) return;

    obj.click(function (event) {

        event.stopPropagation();

        if (box.is(':hidden')) {
            box.show();
        } else {
            box.hide();
        }

    });

    x.click(function (event) {
        box.hide();
    });
}

//日期转换
function SimpleDateFormat(fmt) {

    var positon = {

        "Y+": {s: Date.prototype.setFullYear, g: Date.prototype.getFullYear}, //年
        "M+": {o: -1, s: Date.prototype.setMonth, g: Date.prototype.getMonth}, //月
        "D+": {s: Date.prototype.setDate, g: Date.prototype.getDate}, //日
        "h+": {s: Date.prototype.setHours, g: Date.prototype.getHours}, //时
        "m+": {s: Date.prototype.setMinutes, g: Date.prototype.getMinutes}, //分
        "s+": {s: Date.prototype.setSeconds, g: Date.prototype.getSeconds}  //秒

    };

    for (var p in positon) {
        var rst = new RegExp("(" + p + ")").exec(fmt);
        if (!rst) {
            continue;
        }
        var curr = positon[p];
        curr.b = rst.index;
        curr.l = rst[0].length;
    }

    this.parse = function (str) {
        if (!(typeof(str) == "string")) {
            throw new TypeError(str + " is not a string");
        }

        var date = new Date();
        for (p in positon) {
            var curr = positon[p];
            if (curr.b == null || curr.l == null) {
                continue;
            }

            var val = str.slice(curr.b, curr.b + curr.l);
            if (isNaN(val)) {
                throw new TypeError(val + " is not a number");
            }
            var o = curr.o ? curr.o : 0;
            curr.s.call(date, parseInt(val) + o);
        }
        return date;
    }


    this.format = function (date) {
        if (!(date instanceof Date)) {
            throw new TypeError(date + " is not a Date");
        }

        var str = fmt;
        for (p in positon) {
            var curr = positon[p];
            if (curr.b == null || curr.l == null) {
                continue;
            }

            var val = curr.g.call(date);
            var o = curr.o ? curr.o : 0;
            val = (parseInt(val) - o).toString();
            val = insert(val, "0", curr.l - val.length);
            str = change(str, val, curr.b);
        }
        return str;
    }

    var insert = function (o, m, n) {
        for (var i = 0; i < n; i++) {
            o = m + o;
        }
        return o;
    }

    var change = function (o, m, s) {
        var h = o.slice(0, s);
        var t = o.slice(s + m.length, o.length);
        return h + m + t;
    }

}

//人民币价格转换
function num_split(number) {
    var reg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return String(number).replace(reg, "$1,");
}

function yuan_split(qb) {

    if (qb == null || qb == 0) return 0;

    var qbStr = String(qb).replace(/,/g, '');
    if (isNaN(qbStr)) return 0;

    if (qbStr.length <= 2) return (qbStr / 100).toFixed(2);

    var qb_int = qbStr.substr(0, qbStr.length - 2);
    var qb_de = qbStr.substr(qbStr.length - 2);
    if (qb_int.length == 0) qb_int = "0";

    var qb_rmb = num_split(qb_int) + "." + qb_de;

    return qb_rmb;
};
