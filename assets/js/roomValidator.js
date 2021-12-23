let id = $_GET("Id");

// alert(id)
$(".room__img").attr("src","./assets/img/"+id+".jpg")
$.ajax({
    type: "get",
    url: "./DataAccessLayer/GetRoomInfo.php?Id="+id,
    dataType: "json",
    response: "json",
    success: function (data){
        console.log(data.facilities)
        $('.room__title').append(data.Name)
        $('.room__price').append(data.Price+"₽")
        $('.room__free').append("Осталось "+data.FreePlaces+" номеров!");
        $('.room__facilities').append(()=> {
                let content="";
                data.facilities.forEach(element => content += "<li>" + element + "</li>")
                return content;
            }
        )
    }
})


function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}