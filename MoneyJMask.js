var masks;

function addDots(str, field){
    if(str.length < 7){
        return
    }
    let splitted = str.split(',');
    field.value = splitted[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ',' + splitted[1];
}

function inputRestrict(field, e){
    if(e.inputType.indexOf("insert") > -1){
        let v = field.value;
        let inputed = v.split('')[v.length - 1];
        if(inputed.match(/[0-9\,]/)){
            const commaIndex = v.indexOf(',');
            if(commaIndex > -1){
                if(v.match(/(,).*(\1)/)){
                    field.value = v.substring(0, v.length - 1);
                    return
                }
                else if(v.length > (commaIndex + 3) && e.target.selectionStart > commaIndex){
                    field.value = v.substring(0, v.length - 1);
                }
            }
            else{
                return
            }
        }
        else{
            field.value = v.substring(0, v.length - 1);
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

    addDots(v, field);
}

function setMasks(){
    masks = document.getElementsByClassName('money-mask');
    for(let mask in masks){
        masks[mask].addEventListener("focus", e => {
            document.addEventListener("input", e => {
                inputRestrict(masks[mask], e)
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

function fieldValue(id){
    let field = document.getElementById(id);
    field.hasClass('field-mask') ? () => {
        let v = field.value;
        let arrV = v.split(',');
        let arrInt = arrV[0].split('').filter(el => el != '.');
        let fInt = parseInt(arrInt.join(''));
        let fDec = parseInt(arrV[1]);
        return (fInt + (fDec/100));
    }: () => null
}
