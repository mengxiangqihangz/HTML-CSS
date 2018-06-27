
// function draw(id) {
//     var canvas = document.getElementById(id);
//     if (canvas == null) {
//         return false;
//     }
//     var context = canvas.getContext('2d');
//     var g1 = context.createLinearGradient(0,0,0,300);
//     g1.addColorStop(0,'rgb(255,255,0');
//     g1.addColorStop(1,'rgb(0,255,255');
//     context.fillStyle = g1;
//     context.fillRect(0,0,400,300);
//     var n = 0;
//     var g2 = context.createLinearGradient(0,0,300,0);
//     g2.addColorStop(0,'`(0,0,255,0.5)');
//     g2.addColorStop(1,'rgba(255,0,0,0.5)');
//     for (var i = 0; i < 10; i++){
//         context.beginPath();
//         context.fillStyle = g2;
//         context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
//         context.closePath();
//         context.fill();
//     }
// }

function draw(id) {
    var canvas = document.getElementById(id);
    if (canvas == null) {
        return false;
    }
    var context = canvas.getContext('2d');
    var g1 = context.createRadialGradient(400,0,0,400,0,300);
    g1.addColorStop(0,'rgb(255,255,0');
    g1.addColorStop(0.7,'rgb(255,0,255');
    g1.addColorStop(1,'rgb(0,255,255');
    context.fillStyle = g1;
    context.fillRect(0,0,400,300);

    var g3 = context.createRadialGradient(0,300,0,0,300,300);
    g3.addColorStop(0,'rgb(255,255,0');
    g3.addColorStop(0.7,'rgb(255,0,255');
    g3.addColorStop(1,'rgb(0,255,255');
    context.fillStyle = g3;
    context.fillRect(0,300,400,600);

    // context.beginPath();
    // context.fillStyle = "#FFFFFF";
    // context.lineWidth = 5;
    // context.moveTo(250,250);
    // context.lineTo(250,300);
    // context.closePath();
    // context.fill();
    // context.stroke();

    var n = 0;
    var g2 = context.createRadialGradient(250,250,0,250,250,300);
    g2.addColorStop(0,'rgba(0,0,255,0.5)');
    g2.addColorStop(0.7,'rgba(255,255,0,0.5)');
    g2.addColorStop(1,'rgba(255,0,0,0.5)');
    // context.beginPath();
    // context.fillStyle = g2;
    // var i = 6;
    // context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
    // context.closePath();
    // context.fill();

    for (var i = 0; i < 10; i++){
        context.beginPath();
        context.fillStyle = g2;
        context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }

}