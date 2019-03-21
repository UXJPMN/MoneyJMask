var permitted = /[0-9\,]/g;
var masks;

function addDots(str, field){
    if(str.length < 7){
        return
    }
    let splitted = str.split(',');
    field.value = splitted[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ',' + splitted[1];
}

function charRestrict(field, e){
    var code;
    if(!e){
        var e = window.event;
    }
    if(e.keyCode){
        code = e.keyCode
    }
    else if(e.which){
        code = e.which
    }
    if(code==27) {
        field.blur();
        return false;
    }
    var c = String.fromCharCode(code);
    
    if(!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40){
        if(c.match(permitted)){
            const decIndex = field.value.indexOf(',');
            if(decIndex > -1){
                if(c === ','){
                    e.preventDefault();
                    return false;
                }
                if(field.value.length > (decIndex + 2) && e.target.selectionStart > decIndex)
                {
                    e.preventDefault();
                    return false;
                }
            }
            return true;
        }
        else{
            e.preventDefault();
            return false;
        }
    }
}

function createMask(field){
    let v = field.value;
    let divMark = v.indexOf(',');
    if(field.value.length === 0){
        return        
    }
    else if(field.value == ','){
        v = `0,00`;
        field.value = v;
        return
    }
    else if(divMark < 0){
        v = `${v},00`;
        field.value = v;
        divMark = v.indexOf(',');
        addDots(v, field);
        return;
    }
    else if(divMark === 0){
        v = `0${v}`;
        field.value = v;       
    }

    let commaPos = field.value.length - divMark;
    if(commaPos == 2){
        v = `${v}0`;
        field.value = v;
        addDots(v, field);
        return;
    }
    if(commaPos == 1){
        v = `${v}00`;
        field.value = v;
        addDots(v, field);
        return;
    }
}

function setMasks(){
    masks = document.getElementsByClassName('money-mask');
    for(let mask in masks){
        masks[mask].addEventListener("focus", e => {
            document.addEventListener("keypress", e => {
                charRestrict(masks[mask], e)
            })
        });
        masks[mask].addEventListener("blur", function(){
            createMask(masks[mask]);
        });
    }
}

document.addEventListener("DOMContentLoaded", event => {
    setMasks();   
})
