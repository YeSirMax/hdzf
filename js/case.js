$(function () {
    function getCase(){
        var _id = Workbridage.getURLParams('_id');
        $.ajax({
            type: 'post',
            url: api + 'cased/findcaseByid',
            data: {
                id: _id
            },
            success:function (res) {
                caseInit(res.list)
            }
        })
    }
    getCase();
    function caseInit(list) {
        $('#caseTitle').html(list.title);
        $('#caseDes').html(list.samllinfo);
        ;
        $('#case').html(caseSelectTemplate(list.caseArray, 0,''));
    }
    function caseSelectTemplate(list, num, str) {

        if(num<list.length){
            var _type = list[num].types;
            if(_type == '1'){
                var imgStr = '';
                if(list[num].src !== ''&& list[num].src !== null && list[num].src ){
                    imgStr='<img style="width: 100%" src="'+list[num].src+'" alt="">\n'
                }
                str += ' <div class="containr">\n' +
                    '      <h2 class="case-title-1">' + list[num].caseTitle + '</h2>'+
                    '       <div class="case-cnt-left-right clearfloat">\n' +
                    '            <div class="case-img-group">' +
                    '                <h3 class="case-title-2"> '+ list[num].caseLeftTitle + '</h3>' +
                    '                <div class="case-des-2">' + list[num].caseDetail + '</div>' +
                    '                <div class="case-img" style="">' + imgStr +
                    '                 </div>\n' +
                    '            </div>\n'+
                    '            <div class="case-text-group">'+
                    caseRightStr(list[num].caseRightArray,0, '')+
                    '            </div>'+
                    '       </div>'+
                    '    </div>';

            }
            if(_type == '2'){
                str += ' <div class="containr">\n' +
                    '        <h2 class="case-title-1">' + list[num].caseTitle + '</h2>\n' +
                    '        <div class="case-cnt-item">'+
                    caseBusiness(list[num].listArray, 0,'') +
                    '        </div>'+
                    '   </div>'
            }
            if(_type == '4'){
                str += '<div class="containr">\n' +
                    '        <h2 class="case-title-1">'+ list[num].caseTitle +'</h2>\n' +
                    '        <ul>' +
                    caseImgText(list[num].caseRightArray, 0, '') +
                    '        </ul>' +
                    '   </div>'
            }
            num ++;
            return caseSelectTemplate(list, num, str);
        }else{
            return str
        }

    }
    function caseRightStr(list, num ,str) {
        if(num<list.length){
            str += '<h4 class="case-title-3">'+ list[num].title +'</h4>\n' +
                '<div class="case-des-3">\n' +
                 list[num].detail +
                 '</div>';
            num ++;
            return caseRightStr(list, num ,str);
        }else {
            return str
        }
    }
    function caseBusiness(list, num ,str) {
        if(num<list.length){
            var imgStr = '';
            if(list[num].src !== ''&& list[num].src !== null && list[num].src ){
                imgStr='<img src="'+list[num].src+'" alt="">\n'
            }
            str += '<div class="case-img-item">\n' +
                '               <div class="case-img-con"> '+ imgStr +'</div>\n' +
                '                <div class="case-text-group">\n' +
                '                    <div class="case-title-2">\n' +
                    list[num].title +
                '                    </div>\n' +
                '                    <div class="case-des-2">\n' +
                    list[num].detail +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>';
            num ++;
            return caseBusiness(list, num ,str);
        }else {
            return str
        }
    }
    function caseImgText(list, num, str) {
        if(num<list.length){
            var imgStr = '';
            if(list[num].src !== ''&& list[num].src !== null && list[num].src ){
                imgStr='<img src="'+list[num].src+'" alt="">\n'
            }
            str +=  '<li class="case-cnt-top-btm">' +
                '           <div class="case-img-group">\n' + imgStr +'</div>\n' +
                '                <div class="case-text-group">\n' +
                '                    <h3 class="case-title-2">'+ list[num].title +'</h3>\n' +
                '                    <div class="case-des-2">'+ list[num].detail +'</div>\n' +
                '                </div>'+
                '           </li>';
            num ++;
            return caseImgText(list, num, str) ;
        }else {
            return str
        }
    }
})