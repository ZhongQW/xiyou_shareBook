function borrow(event){
    let storage=window.localStorage;
    let id = event.parentNode.getAttribute("data-index-app");
    let data = {};
    data = {
        bookId: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addrent",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let json = JSON.parse(res);
            if (json.status == 'true') {
                alert("借阅成功！");
                location.reload();
            }else{
                alert('你有书逾期未还，不可借阅！');
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
const getDay = (sDate1) => {   //sDate1和sDate2是2002/12/18格式
    let date = new Date();
    let moun = (String(date.getMonth()+1).length==1)?("0"+(date.getMonth()+1)):(date.getMonth()+1);
    let day = (String(date.getDate()).length==1)?("0"+(date.getDate())):(date.getDate());
    let sDate2 = date.getFullYear()+"-"+moun+"-"+day;
    let aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("/");
    oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);  //转换为12-18-2002格式
    aDate = sDate2.split("/");
    oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);  //把相差的毫秒数转换为天数
    return iDays
};

window.onload =function(){
    let storage=window.localStorage;
    console.log(storage.token);

    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/allreserve",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            console.log(data);
            if(data.length != 0) {
                let ss=" <table id=\"appointtable\">\n" +
                    "            <caption>\n" +
                    "                <h2>我的预约</h2>\n" +
                    "            </caption>\n" +
                    "            <thead>\n" +
                    "            <tr>\n" +
                    "                <th class=\"col-md-2\">书籍名称</th>\n" +
                    "                <th class=\"col-md-2\">图书状态</th>\n" +
                    "                <th class=\"col-md-2\">剩余几天可借书</th>\n" +
                    "            </tr>\n" +
                    "            </thead>\n" +
                    "            <tbody></tbody></table>";
                $(ss).appendTo("#section-4");
                for (let i = 0; i < data.length; i++) {
                let str = '';
                str = "<tr data-index-app="+ data[i].bookId +">\n" +
                    "            <td>"+ data[i].bookName +"</td>\n" +
                    "            <td>已借阅</td>\n" +
                    "            <td>"+ getDay("2019-06-17") +"</td>\n" +
                    "        </tr>";
                $(str).appendTo("#appointtable tbody");
                }
            }else{
                let str = "<div class='none_book'>" +
                    "<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>" +
                    "这里是空的哦~快去预约你喜欢的图书吧~" +
                    "</div>";
                $(str).appendTo("#section-4");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });

}