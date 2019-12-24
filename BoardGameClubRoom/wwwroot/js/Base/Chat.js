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