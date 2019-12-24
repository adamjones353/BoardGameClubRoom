class AjaxControl {

    constructor() {
        AjaxStart();
        AjaxStop();
    }

    AjaxStart() {
        $(document).ajaxStart(function () {
            window.onbeforeunload = () => {
                return "You have attempted to leave this page. Are you sure?";
            };
        });
    }

    AjaxStop() {
        $(document).ajaxStop(function () {
            window.onbeforeunload = null;
        });
    }
   
}

class AjaxOptions {

}
class ChatControl {

    constructor() {
        this.BindListeners();
    }

    BindListeners() {
        $('.chaticon').click(this.ValidateAndSendMessage);
    }

    SendMessage(message) {
        $.ajax({
            method: "POST",
            timeout: 10000,
            data: {
                Message: message,
                TimeStamp: new Date().getTime(),
                Sender: "1"
            },
            url: "chat/sendmessage",
            success: this.SendSuccess,
            dataType: 'json',
            error: this.SendFail
        });
    }

    ValidateAndSendMessage(event) {
        var message = $(".chatInput").val();

        if (message !== "") {
            this.SendMessage(message);
        }
    }

    GetLatestMessages() {

    }

    GetMessagesInDateRange() {

    }

    SendSuccess(data, textStatus, jqXHR) {
        console.log(textStatus);
    }

    SendFail(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }

    PlaySound() {

    }

    SendNotification() {

    }
   
}
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
$(document).ready(function () {

    //has to be loaded this way as classes can depend on other eg cookiecontrol always must go first
    window.app = {};
    window.app.CookieControl = new CookieControl();
    window.app.ScreenSplit = new ScreenSplit();
    window.app.ThemeSelector = new ThemeSelector();
    window.app.ChatControl = new ChatControl();


    $('.dropdown-toggle').on('click', function (event) {
        $(this).parent().find(".dropdown-menu").toggleClass('show');
    });

    $('body').on('click', function (e) {
        if (!$('.dropdown-toggle').is(e.target)
            && $('.dropdown-toggle').has(e.target).length === 0
            && $('.show').has(e.target).length === 0
        ) {
            $('.dropdown-menu').removeClass('show');
        }
    });
});
class ScreenSplit { 

    constructor() {
        this.chat = $('.chatWindow');
        this.details = $('.detailsWindow');
        this.slider = $('.slider');
        this.sliderChat = $('.sliderChatForm');
        this.chatForm = $('.chatFrom');
        this.BindListeners();
        this.drag = "";

      
        if (window.app.CookieControl.getCookie("horizontal") === "0") {
            window.app.CookieControl.setCookie("horizontal", $(window).width()/2, 365);
        }

        if (window.app.CookieControl.getCookie("vertical") === "0") {
            window.app.CookieControl.setCookie("vertical", "200", 365);
        }

        this.UpdateSize();
    }
    
    BindListeners = () => {
        
        this.slider.on("mousedown", (event) => {
            this.StartDrag("horizontal");
        });

        this.sliderChat.on("mousedown", (event) => {
            this.StartDrag("vertical");
        });

        $(document).mousemove((event) => {
            this.DoDrag(event);
        });

        $(document).on("mouseup", (event) => {
            this.StopDrag();
        });

    }

    StopDrag = () => {
        this.drag = "";

        var styles = {
            "-webkit-touch-callout": "initial",
            "-webkit-user-select": "initial",
            "-khtml-user-select": "initial",
            "-moz-user-select": "initial",
            "-ms-user-select": "initial",
            "user-select": "initial"
        };
        $("body").css(styles);
    }

    StartDrag = (direction) => {
        
        this.drag = direction;

        var styles = {
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none"
        };
        $("body").css(styles);
    }
    
    DoDrag = (event) => {

        if (this.drag === "") return;

        var width = window.app.CookieControl.getCookie("horizontal");
        var height = window.app.CookieControl.getCookie("vertical");

        if (this.drag === "horizontal") {
            width = (event.clientX).clamp($(window).width() * 0.2, $(window).width() * 0.8);
        }

        if (this.drag === "vertical") {

            var heightOffset = $(window).height() - 60;

            height = (heightOffset - event.clientY).clamp($(window).height() * 0.1, $(window).height() * 0.6);
        }

        window.app.CookieControl.setCookie("horizontal", width, 365);
        window.app.CookieControl.setCookie("vertical", height, 365);

        this.UpdateSize();
        
    }

    UpdateSize = () => {

        var width = parseInt(window.app.CookieControl.getCookie("horizontal"));
        var height = parseInt(window.app.CookieControl.getCookie("vertical"));
        

        this.slider.css({
            left: `${width}px`
        });
        
        this.sliderChat.css({
            bottom: `${height+60}px`
        });

        this.chat.css({
            width: `${width.clamp($(window).width() * 0.2, $(window).width() * 0.8) / $(window).width() * 100}%`
        });

        this.details.css({
            width: `${100 - (width.clamp($(window).width() * 0.2, $(window).width() * 0.8) / $(window).width()) * 100}%`
        });

        this.chatForm.css({
            height: `${((height).clamp($(window).height() * 0.1, $(window).height() * 0.6))}px`
        });

        this.sliderChat.css({
            width: `${width.clamp($(window).width() * 0.2, $(window).width() * 0.8) / $(window).width() * 100}%`
        });

        
    }
}

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};


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