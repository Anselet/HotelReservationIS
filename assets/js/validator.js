


let formSignUp = document.getElementById("signUp-form");
let formSignIn = document.getElementById("login-form")
// let validateListener = validateY;
// form.addEventListener("input", validateListener);

// $.ajax({
//     url: "session.php",
//     dataType:"json",
//     success:function(sessionRows){
//         var mass = sessionRows["rows"];
//         if(!(mass.length === undefined ||mass.length == null)){
//             for (let row in mass){
//                 addRow(mass[row]);
//             }
//         }
//     },
//     xhrFields: {
//         withCredentials: true
//     }
// });

//AJAX
    $.ajax({
        type: "get",
        url: "./DataAccessLayer/GetStaticData.php",
        dataType: "json",
        response: "json",
        success: function (data){
            $('.card__title__1').append(data[1].Name)
            $('.card__title__2').append(data[2].Name)
            $('.card__title__3').append(data[3].Name)
            $('.card__title__4').append(data[4].Name)
            $('.card__title__5').append(data[5].Name)
            $('.card__price__1').append(data[1].Price+"₽")
            $('.card__price__2').append(data[2].Price+"₽")
            $('.card__price__3').append(data[3].Price+"₽")
            $('.card__price__4').append(data[4].Price+"₽")
            $('.card__price__5').append(data[5].Price+"₽")
        }
    })

$(function() {
    $(formSignUp).submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        console.log($form.attr('action'))
        $.ajax({
            type: $form.attr('method'),
            url:  $form.attr('action'),
            data: $form.serialize(),
            dataType:"json",
            response:"json",
            beforeSend: function(){
                $('.modal.fade.show').attr('style','display: none;')
                $('.modal-backdrop.fade.show').remove()
                $('#regButton').click()

            },
            success: function (data){
                alert(data);
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            alert('Что-то пошло нетак');
        });
    });
});

$(function() {
    $(formSignIn).submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        console.log($form.attr('action'))
        $.ajax({
            type: $form.attr('method'),
            url:  $form.attr('action'),
            data: $form.serialize(),
            dataType:"json",
            response:"json",
            beforeSend: function(){
                $('.modal.fade.show').attr('style','display: none;')
                $('.modal-backdrop.fade.show').remove()
                $('#regButton').click()

            },
            success: function (data){
                alert(data)
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
});
//~~~~~~~~~~~~~~~~~~~~~~~//




