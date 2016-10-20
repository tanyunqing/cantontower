/* File Created: 九月 23, 2012 */
//document.domain = 'ext.weather.com.cn'
var l = $('#lunar'), r = $('#rt'), f = $('#fc'), s = $('#slider'), c = $('#city');
var cb = c.find('#city-btn'), cn = c.find('#city-name .cn'), en = c.find('#city-name .en');
var biggif = 'cloudy,heavyrain,moderaterain,overcast,shower,sunny';//大图Gif天气:多云,大雨,中雨,阴,阵雨,晴
String.prototype.u = function () {
    if (vm.url) {
        var u = vm.url;
        for (var i in vm) {
            u = u.replace('$' + i, vm[i]);
        }
        return u;
    } else
        return ['http://home.cw.uitv.com.cn/weatherdetail.aspx?cityid=', this].join('');
}

var slider = [];
slider.next = function () {
    if (!slider.curIndex) slider.curIndex = 0;
    return slider[(slider.curIndex++) % slider.length];
};
slider.show = function () {
    var a = s.find('a'), n = slider.next();
    n && a.fadeOut(200, function () {
        if (n.url) a.attr('href', n.url);
        else a.removeAttr('href');
        a.html(n.title).attr('target', '_blank').fadeIn(200);
    });
};

var sliderad = [];
var symbolMap = {
    '晴': 'sunny',
    '多云': 'cloudy',
    '阴': 'overcast',
    '阵雨': 'shower',
    '雷阵雨': 'thundershower',
    '冰雹': 'hail',
    '雨夹雪': 'sleet',
    '小雨': 'lightrain',
    '中雨': 'moderaterain',
    '大雨': 'heavyrain',
    '暴雨': 'torrentialrain',
    '大暴雨': 'xrain',
    '特大暴雨': 'xrain',
    '阵雪': 'snowshower',
    '小雪': 'lightsnow',
    '中雪': 'moderatesnow',
    '大雪': 'heavysnow',
    '暴雪': 'torrentialsnow',
    '雾': 'fog',
    '冻雨': 'freezingrain',
    '沙尘暴': 'duststorm',
    '小到中雨': 'moderaterain',
    '中到大雨': 'heavyrain',
    '大到暴雨': 'torrentialrain',
    '暴雨到大暴雨': 'xrain',
    '大暴雨到特大暴雨': 'xrain',
    '小到中雪': 'moderatesnow',
    '中到大雪': 'heavysnow',
    '大到暴雪': 'torrentialsnow',
    '浮尘': 'floatingdust',
    '扬沙': 'dustblowing',
    '强沙尘暴': 'duststorm',
    '雨': 'rain',
    '雪': 'snow',
    '霾': 'floatingdust'
};

function getWeekday(wd) {
    var i = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return i[wd % 7];
}

function getRgba(bg, opacity) {
    if (bg) {
        if (bg.length == 4) bg = ['#', bg.charAt(1), bg.charAt(1), bg.charAt(2), bg.charAt(2), bg.charAt(3), bg.charAt(3)].join('');
        var r = parseInt([bg.charAt(1), bg.charAt(2)].join(''), 16);
        var g = parseInt([bg.charAt(3), bg.charAt(4)].join(''), 16);
        var b = parseInt([bg.charAt(5), bg.charAt(6)].join(''), 16);
        var a = opacity / 100.0;
        return ['rgba(', r, ',', g, ',', b, ',', a, ')'].join('');
    } else return 'transparent';
}
function getFilter(bg, opacity) {
    if (bg) {
        if (bg.length == 4) bg = [bg.charAt(1), bg.charAt(1), bg.charAt(2), bg.charAt(2), bg.charAt(3), bg.charAt(3)].join('');
        else bg = [bg.charAt(1), bg.charAt(2), bg.charAt(3), bg.charAt(4), bg.charAt(5), bg.charAt(6)].join('');
        opacity = Math.floor(opacity * 255 / 100);
        opacity = opacity.toString(16);
        if (opacity.length == 1) opacity = '0' + opacity;
        bg = opacity + bg;
        return ['progid:dximagetransform.microsoft.gradient(startColorstr=\'#', bg, '\', endColorstr=\'#', bg, '\', GradientType=1)'].join('');
    } else return 'transparent';
}


function enterq() {
    c.html('<input type="text" id="city-search">').find('input').focus().blur(leaveq).keydown(function (event) { if (event.which == 13) { d($(this).val()); leaveq(); } if (event.which == 27) leaveq(); });
    return false;
}

function leaveq() {
    c.html('<a id="city-btn" href="#"><i class="icon-search"></i></a><span id="city-name"><span class="cn">北京</span><span class="en"></span></span>').find('#city-name').mouseover(ha);
    cb = c.find('#city-btn').click(enterq), cn = $('.cn').text(vm.n), $('.en').text(vm.en);
}


function d(id) {
    if (typeof id != 'string') id = vm.c;
    var u = '/' + id + '.json';
    if (!id.match(/^\d{9}$/)) u = '/city?' + encodeURIComponent(id);
    $.getJSON(u, { _: Math.random() }, function (data) {

        vm.c = data.c;
        vm.en = data.en;
        vm.n = data.n;
        $.getScript('/' + data.c + '.' + (vm.g || 0) + '.city.js');
        leaveq();
        var size;
        var gif;
        // 实况
        if (vm.r) {
            $('#rt-temp-value,[data-value="rt-temp-value"]').text(data.t);
            $('#rt-scene span,[data-value="rt-temp-scene"] span').text(data.s);
            $('#rt-wind span,[data-value="rt-wind"] span').text(data.w);
            $('#rt-hum span,[data-value="rt-temp-span"] span').text('湿度 ' + data.h + '%');
            var rS = $('#rt-symbol a,[data-value="rt-symbol"] a');
            if (rS.length) {
                gif = size = rS.attr('class').split(' ')[0].split('-')[1];
                if (vm.it == 'classic' && vm.o == 100) {
                    if (gif != 'big') gif = gif.replace('gif', '') + 'gif';
                    else if (biggif.indexOf(symbolMap[data.s]) > -1) size = size + 'gif';
                }
                rS.attr('class', ['symbol-', gif, ' symbol-', size, '-', symbolMap[data.s]].join('')).attr('href', vm.c.u());
            }
        }
        // 预报
        if (vm.f) {
            var s1 = $('#fc-s1 a');
            if (s1.length) {
                gif = size = s1.attr('class').split(' ')[0].split('-')[1];
                if (vm.it == 'classic' && vm.o == 100) {
                    if (gif != 'big') gif = gif.replace('gif', '') + 'gif';
                    else if (biggif.indexOf(symbolMap[data.d1.s]) > -1) size = size + 'gif';
                }
                s1.attr('class', ['symbol-', gif, ' symbol-', size, '-', symbolMap[data.d1.s]].join('')).attr('href', vm.c.u());
            }
            var s1To2 = $('#fc-s1-2 a');
            if (s1To2.length) {
                gif = size = s1To2.attr('class').split(' ')[0].split('-')[1];
                if (vm.it == 'classic' && vm.o == 100) {
                    if (gif != 'big') gif = gif.replace('gif', '') + 'gif';
                    else if (biggif.indexOf(symbolMap[data.d1.s]) > -1) size = size + 'gif';
                }
                s1To2.attr('class', ['symbol-', gif, ' symbol-', size, '-', symbolMap[data.d1.s]].join('')).attr('href', vm.c.u());
            }
            var s2 = $('#fc-s2 a');
            if (s2.length) {
                gif = size = s2.attr('class').split(' ')[0].split('-')[1];
                if (vm.it == 'classic' && vm.o == 100) {
                    if (gif != 'big') gif = gif.replace('gif', '') + 'gif';
                    else if (biggif.indexOf(symbolMap[data.d2.s]) > -1) size = size + 'gif';
                }
                s2.attr('class', ['symbol-', gif, ' symbol-', size, '-', symbolMap[data.d2.s]].join('')).attr('href', vm.c.u());
            }
            var s3 = $('#fc-s3 a');
            if (s3.length) {
                gif = size = s3.attr('class').split(' ')[0].split('-')[1];
                if (vm.it == 'classic' && vm.o == 100) {
                    if (gif != 'big') gif = gif.replace('gif', '') + 'gif';
                    else if (biggif.indexOf(symbolMap[data.d3.s]) > -1) size = size + 'gif';
                }
                s3.attr('class', ['symbol-', gif, ' symbol-', size, '-', symbolMap[data.d3.s]].join('')).attr('href', vm.c.u());
            }

            $('#fc-l1,[data-value="fc-l1"]').text(data.d1.l + '℃');
            $('#fc-l2,[data-value="fc-l2"]').text(data.d2.l + '℃');
            $('#fc-l3,[data-value="fc-l3"]').text(data.d3.l + '℃');
            $('#fc-h1,[data-value="fc-h1"]').text(data.d1.h + '℃');
            $('#fc-h2,[data-value="fc-h2"]').text(data.d2.h + '℃');
            $('#fc-h3,[data-value="fc-h3"]').text(data.d3.h + '℃');
            $('#fc-w1,[data-value="fc-w1"]').text(data.d1.w);
            $('#fc-s1 span,[data-value="fc-s1"] span').text(data.d1.s);
            $('#fc-n1,[data-value="fc-n1"]').text(data.d1.s);
            $('#fc-n2,[data-value="fc-n2"]').text(data.d2.s);
            $('#fc-n3,[data-value="fc-n3"]').text(data.d3.s);
            $('#fc-wd1,[data-value="fc-wd1"]').text(getWeekday(vm.wd));
            $('#fc-wd2,[data-value="fc-wd2"]').text(getWeekday(vm.wd + 1));
            $('#fc-wd3,[data-value="fc-wd3"]').text(getWeekday(vm.wd + 2));
        }
        //农历
        if (vm.l) {
            $('#lunar').text('农历 ' + data.l);
        }
        // 指数
        slider.length = 0;
        // 广告
        if (sliderad.length) {
            for (var i = 0; i < sliderad.length; i++) {
                slider.push(sliderad[i]);
            }
        }
        if (data.i) {
            data.i.cy && slider.push({ title: ['【穿衣指数】', data.i.cy.level, data.i.cy.label].join(' '), url: data.c.u() });
            data.i.xc && slider.push({ title: ['【洗车指数】', data.i.xc.level, data.i.xc.label].join(' '), url: data.c.u() });
            data.i.uv && slider.push({ title: ['【紫外线指数】', data.i.uv.level, data.i.uv.label].join(' '), url: data.c.u() });
        }
        if (!slider.length) {
            s.html('<a href="#" target="_blank">七天预报</a>').find('a').attr('href', vm.c.u());
        }
        $('.container').removeClass('hide');
        b();
        // 跑马灯        
        {
            slider.show();
            if (!slider.timer && slider.length > 1)
                slider.timer = setInterval(slider.show, 6000);
        }

        $(window).trigger($.extend($.Event('data.loaded'), { d: data }));
    });
}
if (!vm.p || true) {
    $(function () {
        $(window).on('city.changed', function (event) { d(event.cityid); });
        $('.container').addClass(vm.it);
        // 跑马灯广告
        if (slider && typeof objectName != 'undefined' && objectName.array && objectName.array.length) {
            var arr = objectName.array, o = arr[0], a = { title: o.text, url: o.clickUrl ? o.clickUrl + '&lid=' + objectName.lid + '&aid=' + o.aid + '&type=3' : '' };
            sliderad.push(a);
            var log = document.createElement('script');
            log.type = 'text/javascript';
            log.src = objectName.logUrl + '&lid=' + objectName.lid + '&aid=' + o.aid + '&type=1&ref=' + encodeURIComponent(document.referrer);
            document.body.appendChild(log);
        }
        // 数据展现
        d();
        !vm.p && $.getScript('http://gadget.weather.com.cn/stat.js');
    });
}
$(function () {
    var a = document.createElement('a');
    a.id = 'ha';
    document.body.appendChild(a);
    $(a).css({ 'position': 'absolute', 'z-index': '100' }).hide();
    if ($('#isred')) {
        $(a).mouseenter(function () {
            $('span,a', $('#isred')).each(function () {
                $(this).css({ 'color': 'red' });
            });
        });
        $(a).mouseleave(function () {
            $('span,a', $('#isred')).each(function () {
                $(this).css({ 'color': '' });
            });
        });
    }
    $('a').attr('target', '_blank').click(function () {
        $.getScript('http://wlog.cw.uitv.com.cn/pluginlog.aspx?pluginid=' + vm.g + '&domain=' + encodeURIComponent(vm.d) + '&href=' + encodeURIComponent(this.href));
    });
    setTimeout(function () {
        $.getScript('http://wlog.cw.uitv.com.cn/pluginlog.aspx?pluginid=' + vm.g + '&domain=' + encodeURIComponent(vm.d));
    }, 1000);
});

function ha(event) {
    $('#ha').css({
        left: $(this).offset().left,
        top: $(this).offset().top,
        width: $(this).width(),
        height: $(this).height(),
        opacity: 0,
        filter: 'alpha(opacity=0)',
        '-moz-opacity': 0
    }).attr('href', vm.c.u()).show();
}

function b() {
    var box = $('body>div');
    vm.bg && box.css('background-color', getRgba(vm.bg, vm.o) || 'transparent').css('filter', getFilter(vm.bg, vm.o) || 'transparent');
    vm.b && box.addClass('border').css('border-color', vm.b);
    vm.br && box.addClass('radius');
    vm.w && box.width(vm.w);
    vm.h && box.height(vm.h - parseInt($('body').css('margin-top')));
    vm.fc && box.css('color', vm.fc);
    !vm.l && l.remove();
    if (!vm.r) r.remove(); else r.find('a').attr('href', vm.c.u());
    if (!vm.f) f.remove(); else f.find('a').attr('href', vm.c.u());
    if (!vm.s) cb.remove(); else if (!vm.p || true) cb.click(enterq);
    cn.text(vm.n), en.text(vm.en);
    $('#a,#rt,#fc').mouseover(ha);
}
