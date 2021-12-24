let formSignUp = document.getElementById("signUp-form");
let formSignIn = document.getElementById("login-form");
// document.addEventListener('cookiechange', ({detail: {oldValue, newValue}})=> {
//     console.log(`Cookie changed from "${oldValue}" to "${newValue}"`);
// });

// alert(document.cookie)
// let validateListener = validateY;
// form.addEventListener("input", validateListener);
updateCookie();
if (document.documentURI.includes("profile")){
    getWholeUSerInfo()
    let user=JSON.parse(getCookie("user"));
    $('.profile__name').append(user.Name)
    $('.phone__number').append(user.Phone)
    $('.profile__email').append(user.Email)
}

// console.log(getCookie("user"))



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
               $('.modal.fade.show').attr('style','display: none;')
               $('.modal-backdrop.fade.show').remove()
               // $('#regButton').click()
            },
            success: function (data){
                updateCookie();
                // alert(data)
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
});

$('#exit__button').on('click',function () {
    console.log(document.cookie)
    window.localStorage.clear();
    $.ajax({
        url: './DataAccessLayer/exit.php'
    })
    document.location.href = "index.html";
    delete_cookie("user");

})

//~~~~~~~~~~~~~~~~~~~~~~~//
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function updateCookie() {
    $.ajax({
        url: "./DataAccessLayer/Session.php",
        dataType: "json",
        response: "json",
        success: function (cookie) {
            // console.log("Ajax " + JSON.stringify(cookie["User"]))
            document.cookie = "user=" + JSON.stringify(cookie["User"]);
            updateUser();
        },
        error: function () {
            updateUser();
        },

        xhrFields: {
            withCredentials: true
        }
    });
}

function updateUser(){
    console.log("update")
if (getCookie("user") != null){
    $('.top__button').remove();
    let cookie = JSON.parse(getCookie("user"))
    $('.named__user').attr('style','display: block;')
    $('#Name__top').append(cookie.Name)
} else {
    $('.top__button').attr('style','display: block;')
}
}

function getWholeUSerInfo() {
    console.log(JSON.parse(getCookie("user")))
    $.ajax({
        url: "./DataAccessLayer/GetUserInfo.php",
        type: "POST",
        dataType: "json",
        response: "json",
        data: JSON.parse(getCookie("user")),
        success: function (response) {
            console.log(response)
            response.forEach((data)=>{
                data.date= data.first_date.split("-").reverse().join(".")+" \u2013 "+ data.second_date.split("-").reverse().join(".");
                delete data.first_date;
                delete data.second_date;
                addRow(data);
            })
        },
        error: function () {
        },

        xhrFields: {
            withCredentials: true
        }
    });

}

function creatResTable() {
    let resCol = document.getElementById("resCol")
    let resTable= document.getElementById("res_table");
    if (resTable == undefined){
        resTable = document. createElement("table");
        resTable.id="res_table";
        resTable.classList.add("profile__orders");
        let tBody =document.createElement("tbody");
        resTable.appendChild(tBody);
        let headers =document.createElement("tr");
        headers.id ="res_table_headers";
        tBody.appendChild(headers);
        let columnX =document.createElement("th");
        columnX.id= "res_table_x";
        columnX.innerText="Номер заказа";
        headers.appendChild(columnX);
        let columnY =document.createElement("th");
        columnY.id= "res_table_y";
        columnY.innerText="Название номера";
        headers.appendChild(columnY);
        let columnR =document.createElement("th");
        columnR.id= "res_table_r";
        columnR.innerText="Даты";
        headers.appendChild(columnR);
        resCol.appendChild(resTable);
    }
}

function addRow(data){
    creatResTable();
    let newRow =document.createElement("tr");
    for (let key in data){
        let  newCell =document.createElement("td");
        newCell.innerText = data[key];
        newRow.appendChild(newCell);
    }
    document.getElementById("res_table").appendChild(newRow)
}



function delete_cookie( name, path, domain ) {
    if( get_cookie( name ) ) {
        document.cookie = name + "=" +
            ((path) ? ";path="+path:"")+
            ((domain)?";domain="+domain:"") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

export  {updateCookie, getCookie}



