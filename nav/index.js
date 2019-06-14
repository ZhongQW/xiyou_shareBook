/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/5
    Time: 15:01
*/
var image;

$(function() {
    $("#person").hover(
        function(){
            $("#personcenter").fadeIn();
        },
        function(){
        }
    );
    $("#personcenter").mouseleave(function(){
        $("#personcenter").fadeOut();
    });
    $("#sign_out").click(function(){
        window.location = "../login/login.html";
    })
});
function selectImage(file){
    if(!file.files || !file.files[0]){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt){
        document.getElementById('book_img').src = evt.target.result;
        image = evt.target.result;
        // console.log(image);
    };
    reader.readAsDataURL(file.files[0]);
}
function handleBookDetail(event){
    var sessionStorage=window.sessionStorage;
    let  id = event.getAttribute("data-index-book");
    // console.log(id);
    sessionStorage.setItem('book_id',id);
    $("#search").val("");
    $("#find_content").css('display', 'none');
    // window.location.href = "../detail/librarydetail.html";
}

window.onload =function(){
    var storage=window.localStorage;
    // $("#find_content.onmouseleave(function(){
    //     $("#find_content").css('display', 'none');
    // });
    $("#search").bind('input onpropertychange', function() {
        $("#find_content").empty();
        // alert("aaa");
        if($("#search").val().replace(/(^\s*)|(\s*$)/g, "") != '') {
            $("#find_content").css('display', 'block');
            let data = {
                key: $("#search").val()
            };
            data = JSON.stringify(data);
            console.log(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/searchbook",
                headers: {'Authorization': storage.token},
                data: data,
                success: function (res) {
                    let data = JSON.parse(res);
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        let str = "<li data-index-book=\""+ data[i].id +"\" onclick=\"handleBookDetail(this)\" ><a href='../detail/librarydetail.html' target=\"iframe\">"+ data[i].name +"</a></li>";
                        $(str).appendTo($("#find_content"));
                    }
                },
                error: function (res) {
                    alert("加载失败" + JSON.stringify(res));
                }
            });
        }else{
            $("#find_content").css('display', 'none');
        }
    });
};

$("#btn_add_book").click(function(){
    var storage=window.localStorage;
    console.log($("#book_del").val());
    // console.log(image);
    let data = {};
    data = {
        name: $("#book_name").val(),
        type: $("#book_type").val(),
        author: $("#book_author").val(),
        finalDay: $("#book_del").val(),
        intro: $("#book_intro").val(),
        img: image.split(',')[1]
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addbook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data.status);
            if(data.status){
                window.location.reload();
            }else{
                alert("增加图书失败！");
            }
        },
        error: function(res){
            alert("添加失败"+JSON.stringify(res));
        }
    });
});