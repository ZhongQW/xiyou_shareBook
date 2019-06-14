/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/8
    Time: 14:46
*/
window.onload = function(){
    let storage = window.localStorage;
    $("#updatePhone").click(function(){
        let data = {};
        data = {
            tel: $("#phone_").val()
        };
        data = JSON.stringify(data);
        // console.log(data);
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/updateUserTel",
            headers: {'Authorization': storage.token},
            data: data,
            success: function(res){
                let json = JSON.parse(res);
                if(eval('json.'+"status") === "0"){
                    alert("修改手机号成功！");
                }
            },
            error: function(res){
                alert("加载失败"+JSON.stringify(res));
            }
        });
        });
    $("#updatePass").click(function(){
        if($("#pass").val() === $("#repass").val()) {
            let data = {};
            data = {
                password: $("#pass").val()
            };
            data = JSON.stringify(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/updateUserPassword",
                headers: {'Authorization': storage.token},
                data: data,
                success: function (res) {
                    let json = JSON.parse(res);
                    if(eval('json.'+"status") === "0"){
                        alert("修改密码成功");
                    }
                },
                error: function (res) {
                    alert("加载失败" + JSON.stringify(res));
                }
            });
        }else{
            alert("俩次密码不一致!");
        }
    });
}