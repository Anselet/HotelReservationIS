


let formSignUp = document.getElementById("signUp-form");
let formSignIn = document.getElementById("login-form");
// alert(document.cookie)
// let validateListener = validateY;
// form.addEventListener("input", validateListener);

$.ajax({
    url: "./DataAccessLayer/Session.php",
    dataType:"json",
    response: "json",
    success:function(cookie){
        // console.log("Ajax "+JSON.stringify(cookie["User"]))
        document.cookie="user="+JSON.stringify(cookie["User"]);
    },
    xhrFields: {
        withCredentials: true
    }
});

console.log(getCookie("user"))
if (getCookie("user") != null){
    let cookie = JSON.parse(getCookie("user"))
    $('.named__user').attr('style','display: block;')
    $('#Name__top').append(cookie.Name)
} else $('.top__button').attr('style','display: block;')

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
            alert('Что-то пошло не так');
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
               // $('.modal.fade.show').attr('style','display: none;')
               // $('.modal-backdrop.fade.show').remove()
               // $('#regButton').click()

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

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
//~~~~~~~~~~~~~~~~~~~~~~~//




