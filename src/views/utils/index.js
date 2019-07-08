/**
 * 解析city
 * @param data
 * @return {Array}
 */
export function parseCity(data = {}) {
    let options = [];
    options = Object.values(data).map((provice) => {
        return {
            'label': provice.name,
            'value': provice.name,
            'children': Object.values(provice.cities).map((city) => {
                return {
                    'label': city.name,
                    'value': city.name,
                    'children': Object.values(city.districts).map((district) => {
                        return {
                            'label': district,
                            'value': district,
                        };
                    }),
                };
            }),
        };
    });

    return options;
}

/**
 * 获取cookie
 * @param c_name
 * @return {*}
 */
export function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start, c_end;
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== 1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === 1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays === null) ? "" : "; expires=" + exdate.toGMTString());
}