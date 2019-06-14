window.onload = function() {
    var imgList = document.getElementById('img').getElementsByTagName('li');
    var list = document.getElementById('index').getElementsByTagName('li');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index=0;
    var timer;
    var moveImg=function(list,index) {
        for(var i=0;i<list.length;i++){
            if(list[i].className==='opa-on'){
                list[i].className='';
            }
        }
        list[index].className='opa-on';
    };

    var moveIndex=function(list,num){
        for(var i=0;i<list.length;i++){
            if(list[i].className==='on'){
                list[i].className='';
            }
        }
        list[num].className='on';
    };

    var preMove=function(){
        index-=1;
        if(index<0){
            index=4;
        }
        moveImg(imgList,index);
        moveIndex(list,index);
    };

    var nextMove=function(){
        index+=1;
        if(index>4){
            index=0
        }
        moveImg(imgList,index);
        moveIndex(list,index);
    };

    prev.onclick = function() {
        clearInterval(timer);
        preMove();
        play();
    };

    next.onclick = function() {
        clearInterval(timer);
        nextMove();
        play();
    };

    for(var i=0;i<list.length;i++){
        list[i].index=i;
        list[i].onmouseover= function () {
            var clickIndex=this.index;
            index=clickIndex;
            moveImg(imgList,index);
            moveIndex(list,index);
            clearInterval(timer);
        };
        list[i].onmouseout= function () {
            play();
        };
    }

    var play=function(){
        timer=setInterval(function(){
            nextMove();
        },3000);
    };

    play();

    //登录注册
    let ologinBtn = $("#loginBtn");
    let oregisterBtn = $("#registerBtn");
    let oDiv_login = $("#login");
    let oDiv_register = $("#register");

    let Lpass = $(".login_pass").find("input:first");

    let Rname = $("#R_name");
    let RPhone = $("#R_phone");
    let Rpass = $("#R_pass");
    let pass_strength = $("#pass_strength");

    let oError = $(".error_").eq(0);
    let oEye = $(".eye_b");
    let oeye_1 = oEye.eq(0);
    let oeye_2 = oEye.eq(1);
    let bOff_1 = true;
    let bOff_2 = true;

    let btn_r = $(".btn_regis:first").find("a:first");
    let btn_l = $(".btn_login:first").find("a:first");


    ologinBtn.click( function () {
        oDiv_login.css("display", "block");
        oDiv_register.css("display", "none");
    });
    oregisterBtn.click( function () {
        oDiv_login.css("display", "none");
        oDiv_register.css("display", "block");
    });
    RPhone.blur(funPhone);
    function funPhone() {
        let rg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        let phone = RPhone.val();
        if (!rg.test(phone)) {
            RPhone.text('');
            oError.text('请输入有效的手机号');
            oError.css("display", 'block');
            setTimeout(function () {
                oError.css("display", 'none');
            }, 5000);
            return false;
        }else{
            return true;
        }
    }
    Rname.blur(funName);
    function funName() {
        let rg = /^[a-zA-Z0-9_]{6,20}$/;
        let name = Rname.val();
        if (!rg.test(name)) {
            Rname.text('');
            oError.text('用户名不合法(6-20位字母+数字+下划线)');
            oError.css("display", 'block');
            setTimeout(function () {
                oError.css("display", 'none');
            }, 5000);
            return false;
        }else{
            return true;
        }
    }
    Rpass.bind('input onpropertychange', function() {
        //强：字母+数字+特殊字符
        let str1 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{4,16}$/;
        //中：字母+数字，字母+特殊字符，数字+特殊字符
        let str2 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
        //弱：纯数字，纯字母，纯特殊字符
        let str3 = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
        let input = Rpass.val();
        if(input === ''){
            pass_strength.css("display", "none");
        }else {
            pass_strength.css("display", "block");
            if (str1.test(input)) {
                pass_strength.css("backgroundColor", '#00b300');
                pass_strength.text('强');
            }
            if (str2.test(input)) {
                pass_strength.css("backgroundColor", '#80bfff');
                pass_strength.text('较强');
            }
            if (str3.test(input)) {
                pass_strength.css("backgroundColor", '#e60000');
                pass_strength.text('弱');
            }
        }
    });
    oeye_1.click(function(){
        if(bOff_1){ //是隐藏密码
            oeye_1.removeClass();
            oeye_1.addClass('eye_k');
            Lpass.attr('type','text');
        }
        else { //是显示密码
            oeye_1.removeClass();
            oeye_1.addClass('eye_b');
            Lpass.attr('type','password');
        }
        bOff_1 = !bOff_1;
    });
    oeye_2.click(function(){
        if(bOff_2){ //是隐藏密码
            oeye_2.removeClass();
            oeye_2.addClass('eye_k');
            Rpass.attr('type','text');
        }
        else { //是显示密码
            oeye_2.removeClass();
            oeye_2.addClass('eye_b');
            Rpass.attr('type','password');
        }
        bOff_2 = !bOff_2;
    });
    btn_r.click(function() { //在登录窗口点击注册
        oDiv_register.css("display", "block");
        oDiv_login.css("display", "none");
    });
    btn_l.click( function(){ //在注册窗口点击登录
        oDiv_register.css("display", "none");
        oDiv_login.css("display", "block");
    });
    $('#login_btn').click(function(){

        let data = {};
        data = {
            userName: $("#login .login_name input").val(),
            password: $("#login .login_pass input").val()
        };
        data = JSON.stringify(data);
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/login",
            data: data,
            success: function(res){
                let json = JSON.parse(res);
                // alert(eval('json.'+"status"));
                switch (eval('json.'+"status")){
                    case '1':
                        alert("密码错误！");
                        break;
                    case '2':
                        alert("用户名不存在！");
                        break;
                    case '3': //普通用户
                       window.location.href = './nav/index.html';
                        break;
                    case '4': //管理员
                        window.location.href = './manage/index.html';
                        break;
                }
                let storage=window.localStorage;
                storage.setItem("token", eval('json.'+"token"));
            },
            error: function(res){
                alert("加载失败"+JSON.stringify(res));
            }
        });

    });
    $('#register_btn').click (function() {

        if (funName() && funPhone()) {

            let data = {};
            data = {
                userName: $("#register .login_name input").val(),
                password: $("#register .login_pass input").val(),
                tel: $("#register .phone_ input").val()
            };
            data = JSON.stringify(data);
            // console.log(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/register",
                data: data,
                success: function(res){
                    let json = JSON.parse(res);
                    switch (eval('json.'+"status")){
                        case '0':
                            location.reload();
                            break;
                        case '1':
                            alert("用户名重复！");
                            break;
                    }
                },
                error: function(res){
                    alert("加载失败"+JSON.stringify(res));
                }
            });

        }
    });
};