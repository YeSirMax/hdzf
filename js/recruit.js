$(function () {
    jQuery.support.cors = true;
    $.ajax(
        {
            type: 'post',
            url:api + "emply/findAllEmploymentType",
            data:{
                date: new Date()
            },
            success: function (res) {
               var result = navAdd(res.typeList,0,'');
               $(".nav-group").html(result);
               navChild(res.typeList[0]._id);
            },
            error:function (res) {
                console.log(res);
            }
        }
    )
});
var recruitData = [];
function navAdd(list, num, str) {
    if( num < list.length){
        var className = '';
        if( num == 0){
            className = 'active';
        }
        str +='<li class="' +className+ '" style="width: '+100 / list.length+'% "data-item = "'+ list[num]._id +'"data-title = "'+ list[num].name +'"onclick="navTab(this) "' +
            '>'+ list[num].name +
            '</li>';
        num++;
        return navAdd(list, num,str);
    }
    else{
        return str;
    }
}
function navTab(e) {
    $('.nav-group li').removeClass('active');
    $(e).addClass('active');
    var navId = $(e).attr('data-item');
    var navTitle = $(e).attr('data-title');
    navChild(navId, navTitle);
};
function menuTab(e) {
    $('.menu-group li a').removeClass('active');
    $(e).addClass('active');
    var menuId = $(e).attr('data-item');
    var recDes = new JobDetails(recruitData.list, menuId);
    $('.recruit-tab').html(recDes.str)
}
function navChild(_id,title) {
    $.ajax({
        type: 'post',
        url: api + "infos/searchByparentId",
        data: {
            parentId: _id,
            date: new Date()
        },
        success: function (childData) {
            if(childData.code === 0){
                recruitData = childData;
                var res = menuAdd(childData.list, 0, '','');
                addMenu.list = childData.list;
                $(".menu-group").html(res);
                var recDes = new JobDetails(childData.list, 0,title);
                $('.recruit-tab').html(recDes.str)

            }
        }
    })
};
function menuAdd(list, num, str, _css) {
    if( num<list.length){
        var className = '';
        if( num == 0){
            className = 'active';
        }
        str +='<li style="' + _css + '"><a class="' +className+ '"  data-item="'+ num +'" data-group="'+ recruitData.name +'" onclick="menuTab(this)">'+ list[num].title + '</a></li>';
        num++;
        return menuAdd(list, num,str, _css);
    }
    else{
        return str;
    }
}
function addList(_obj) {
    this.num = _obj.num;
    this.list = _obj.list;
    this._str = _obj._str;
    this.editStr = _obj.editStr;
    this.css = _obj._css;
    this.className = '';
}
var addMenu = new addList({
    num: 0,
    list: [],
    className: '',
    _str: '',
    editStr: function () {
        if( this.num<this.list.length){
            if( this.num  == 0){
                this.className  = 'active';
            }
            this._str +='<li style="' + this.css + '"><a class="' + this.className + '"  data-item="'+this.num  +'" onclick="menuTab(this)">'+ this.list[this.num].title + '</a></li>';
            this.num++;
            return this.editStr(this.list, this.num, this._str, this.css);
        }
        else{
            return {str:this._str};
        }
    }
});
function JobDetails (list,item,title){
    if(list.length === 0){
        //this.res = '岗位已满';
        this.res = '';
    }else {
        this._detail = list[item].detail.split('$');
        this._need = list[item].need.split('$');
        this._place = list[item].place;
        this.res = '<div class="recruit-item">' +
            '                    <h2>职位描述</h2>' +
            '                    <p>' + strCut( this._detail, 0, '') + '</p>' +
            '                </div>' +
            '                <div class="recruit-item">' +
            '                    <h2>任职要求</h2>' +
            '                    <p>'+ strCut( this._need, 0, '') +'</p>' +
            '                </div>' +
            '                <div class="recruit-item">' +
            '                    <h2>工作地点</h2>' +
            '                    <p>'+ this._place +'</p>' +
            '                </div>' +
            '                <div class="recruit-item">' +
            '                    <h2>投递简历</h2>' +
            //'                    <a class="recruit-btn" href="recruit-resume.html?_id='+ list[item]._id +'&title='+ encodeURI(list[item].title) +'&class='+ title +'">投递简历</a>' +
            '                       <p>hr@paradigmrt.com</p>'+
            '                </div>' +
            '                <div class="recruit-item">' +
            '                    <p>【简历命名要求】：姓名-电话-意向岗位</p>' +
            '                </div>';
    }

    return { str: this.res}
}

function strCut( _list, num, str) {
    if (num<_list.length){
        str += '<p>'+ _list[num] + '</p>';
        num++;
        return strCut( _list, num, str)
    }else{
        return str
    }
}

