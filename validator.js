var button_now;


let form = document.getElementById("signUp-form");
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
$(function() {
    $(form).submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        console.log($form.attr('action'))
        $.ajax({
            type: $form.attr('method'),
            url:  $form.attr('action'),
            data: $form.serialize(),
            dataType:"json",
            response:"json",
            // beforeSend: function(){
            //     if(!validateY()){
            //         return false
            //     }
            // },
            success: function (data){
                alert(data);
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
});
//~~~~~~~~~~~~~~~~~~~~~~~//




