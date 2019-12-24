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