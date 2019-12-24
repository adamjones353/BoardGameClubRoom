class CookieControl {

    constructor() {
        
    }

    checkCookie(name) {
        var username = this.getCookie(name);
        if (username != "") {
            return true;
        } else {
            return false;
        }
    }

    getCookie(name) {
        name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie(name, value, expireTimeDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expireTimeDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
   
}