function myFunction() {
    var myX = document.forms["frm1"];
    var text = "";
    var iiii;
    for (iiii = 0; iiii < x.length ;iiii++) {
        text += myX.elements[iiii].value + "<br>";
    }
    document.getElementById("demo").innerHTML = text;
}
