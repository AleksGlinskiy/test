document.addEventListener("DOMContentLoaded", function() {

    $('.owl-carousel').owlCarousel({
        items: 1,
    });

    $('#my-menu').mmenu({
        navbar: {
            title: 'основное меню сайта'
        },
        navbars: [
            {
               "position": "top",
               "content": [
                  "prev",
                  "title"
               ]
            }
        ]
    });

    $('#order-form').submit(function(e) {
        e.preventDefault();
        var name = $('#form_name').val();
        var tel = $('#form_tel').val();
        var message = $('#form_message').val();
        var errors = 0;

        if (name === '') {
            $('#form_name').addClass('error');
            errors += 1;
            new Noty({
                text: "Заполните поле \"Имя\"",
                type: "error",
                timeout: 3000,
                layout: "bottomRight"
            }).show();
        }else {
            $('#form_name').removeClass('error');
        }

        if (tel === '') {
            $('#form_tel').addClass('error');
            errors += 1;
            new Noty({
                text: "Заполните поле \"Телефон\"",
                type: "error",
                timeout: 3000,
                layout: "bottomRight"
            }).show();
        }else {
            $('#form_tel').removeClass('error');
        }

        if (errors === 0) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: "name="+name+"&tel="+tel+"&message="+message,
                success: function(msg){
                    var result = msg;
                    if ( result.message === "1") {
                        $('#order-form')[0].reset();
                        $.fancybox.close();
                        new Noty({
                            text: "Данные отправлены!",
                            type: "success",
                            timeout: 3000,
                            layout: "bottomRight"
                        }).show();
                    } else {
                        new Noty({
                            text: "Ошибка!",
                            type: "error",
                            timeout: 3000,
                            layout: "bottomRight"
                        }).show();
                    }
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    new Noty({
                        text: msg,
                        type: "error",
                        timeout: 3000,
                        layout: "bottomRight"
                    }).show();
                }
            });
        }
      });
    
});