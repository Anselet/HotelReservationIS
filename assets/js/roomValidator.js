import {updateCookie,getCookie } from './validator.js'
// updateCookie();


let id = $_GET("Id");
let  $BookingForm = document.getElementById('booking-form')
// alert(id)
let roomsFree
$(".room__img").attr("src","./assets/img/"+id+".jpg")
getRoomInfo()
function getRoomInfo() {
    $.ajax({
        type: "get",
        url: "./DataAccessLayer/GetRoomInfo.php?Id=" + id,
        dataType: "json",
        response: "json",
        success: function (data) {
            console.log(data.facilities)
            $('.room__title').text(data.Name)
            roomsFree=data.FreePlaces;
            $('.room__price').text(data.Price + "₽")
            $('.room__free').text("Осталось " + data.FreePlaces + " номеров!");
            $('.room__facilities').replaceWith(() => {
                    let content = "";
                    data.facilities.forEach(element => content += "<li>" + element + "</li>")
                    return content;
                }
            )
        }
    })
}

$(function (){
    $($BookingForm).submit(function (e){
        e.preventDefault();
        let $form=$(this)
        if (getCookie("user")== null){
            $('.warning').attr("style","display: block")
            return
        }
        let userId=JSON.parse(getCookie("user")).Id
        if (roomsFree==0){
            $('.warning__1').attr("style","display: block")
            return;
        }
        let $formData = new FormData(e.target)
        // console.log($form.serialize()
        // console.log($formData.get("first_date"))
        // let $data="first_date="+$formData.get("first_date")+"&second_date="+$formData.get("second_date")+"&user_Id="+
        //   +userId+"&category_Id="+id;
        let $data= {};
        $data.user_Id=userId;
        $data.first_date=$formData.get("first_date").replaceAll("/",".").split(".").reverse().join(".");
        $data.second_date=$formData.get("second_date").replaceAll("/",".").split(".").reverse().join(".");
        $data.category_Id=id;
        console.log($data)
        // $data= $data.replaceAll("/",".")
        $.ajax({
            type: "POST",
            url: $form.attr('action'),
            data: $data,
            dataType: "json",
            response: "json",
            success: function (data) {
                console.log(data)
                getRoomInfo();
            }

        })


    })

})


function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}