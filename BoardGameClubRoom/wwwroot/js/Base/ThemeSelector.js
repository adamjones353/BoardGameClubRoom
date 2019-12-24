class ThemeSelector {

    constructor() {
        this.style_cookie_name = "theme";
        this.GetCookieTheme();
        this.BindListeners();
        
    }

    BindListeners = () => {
        $('#themes').change(() => {
            this.SwitchTheme($('#themes').val());
        });
    }

    SwitchTheme(css_title) {

        const link_tag = document.getElementsByTagName("link");
        for (let i = 0; i < link_tag.length; i++) {
            if (link_tag[i].rel.indexOf("stylesheet") !== -1 && link_tag[i].title) {
                link_tag[i].disabled = true;
                if (link_tag[i].title === css_title) {

                    $('#themes').val(css_title);


                    link_tag[i].disabled = false;
                }
            }
            window.app.CookieControl.setCookie(this.style_cookie_name, css_title, 365);
        }
    }

    GetCookieTheme() {
        var css_title = window.app.CookieControl.getCookie(this.style_cookie_name);
        if (css_title.length) {
            this.SwitchTheme(css_title);
        }
    }
}