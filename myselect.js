(function ($) {
    $.fn.citySelect = function (settings) {
        settings = $.extend({
            url: "js/city.min.js",
            prov: null,
            city: null,
            dist: null,
            // nodata:null,
            required: true
        }, settings);
        var _this = this;
        var pro_obj = _this.find('.prov');
        var city_obj = _this.find('.city');
        var dist_obj = _this.find('.dist');
        var select_prehtml = (settings.required) ? '' : "<option value=''>请选择</option>";
        var city_json;
        var init = function () {
            //初始化的值
            temp_html = select_prehtml;
            $.each(city_json.citylist, function (i, value) {
                temp_html += "<option value='" + value.p + "'>" + value.p + "</option>";
            })
            pro_obj.html(temp_html);
            //设置默认值
            if (settings.prov != null) {
                pro_obj.val(settings.prov);
                cityStart();
                if (settings.city != null) {
                    city_obj.val(settings.city);
                    distStart();
                    if (settings.dist != null) {
                        dist_obj.val(settings.dist);
                    }
                    ;
                }
                ;
            }
            ;
        }
        var cityStart = function () {
            var prov_id = pro_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
            }
            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);
            if (prov_id < 0) {
                return 0;
            }
            temp_html = select_prehtml;
            console.log();
            $.each(city_json.citylist[prov_id].c, function (i, city) {
                temp_html += "<option value='" + city.n + "'>" + city.n + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});

        }
        var distStart = function () {
            var prov_id = pro_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
                city_id--;
            }
            dist_obj.empty().attr("disabled", true);
            if (prov_id < 0 || city_id < 0) {
                dist_obj.html('');
                return 0;

            }

            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c[city_id].a, function (i, dist) {
                temp_html += "<option value='" + dist.s + "'>" + dist.s + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
        }
        // 选择省份时发生事件
        pro_obj.bind("change", function () {
            cityStart();
        });

        // 选择市级时发生事件
        city_obj.bind("change", function () {
            distStart();
        });
        // 设置省市json数据
        if (typeof(settings.url) == "string") {
            $.getJSON(settings.url, function (json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        }
        ;
    }
})(jQuery);
