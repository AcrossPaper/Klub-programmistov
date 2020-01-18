var c = document.getElementById("sandbox");
var canvas_height = c.clientHeight;
var canvas_width = c.clientWidth;
var circle_radius = c.clientWidth/3;

function setCircle() {
    //Рисуем пустой круг на форме
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(canvas_height/2, canvas_width/2, circle_radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    //Рисуем минутные деления на круге (На часах 60 минутных делений)
    
    for(let minute = 0; minute < 60; ++minute) {
        let minute_angle = (minute / 60) * (2 * Math.PI);
        let minute_x = circle_radius * Math.cos(minute_angle);
        let minute_y = circle_radius * (-Math.sin(minute_angle));
        let minute_x_end = 0.9 * minute_x;
        let minute_y_end = 0.9 * minute_y;
        
        minute_x += canvas_height/2;
        minute_y += canvas_height/2;
        minute_x_end += canvas_height/2;
        minute_y_end += canvas_height/2;
        
        minute_line = new Path2D();
        minute_line.moveTo(minute_x, minute_y);
        minute_line.lineTo(minute_x_end, minute_y_end);
        ctx.stroke(minute_line);
    } 
    
    return ctx;
}
        
    

function drawTimeArrows(ctx) {
    //Рисуем стрелки
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    var secondsAngle = (seconds / 60) * (2 * Math.PI);
    var minutesAngle = (minutes / 60) * (2 * Math.PI);
    var hourAngle = ((hours % 12) / 12) * (2 * Math.PI);
    
    secondAngle = Math.PI / 2 - secondsAngle;
    minutesAngle = Math.PI / 2 - minutesAngle;
    hourAngle = Math.PI / 2 - hourAngle;
    
    var minute_x = circle_radius * Math.cos(minutesAngle);
    var minute_y = circle_radius * (-Math.sin(minutesAngle));
    
    minute_x += canvas_height/2;
    minute_y += canvas_height/2;
    
    var seconds_x = circle_radius * Math.cos(secondAngle);
    var seconds_y = circle_radius * (-Math.sin(secondAngle));
    
    seconds_x += canvas_height/2;
    seconds_y += canvas_height/2;
    
    var minute_line = new Path2D();
    minute_line.moveTo(canvas_height/2, canvas_width/2);
    minute_line.lineTo(minute_x, minute_y);
    ctx.lineWidth = 5;
    ctx.stroke(minute_line);
    
    var seconds_line = new Path2D();
    seconds_line.moveTo(canvas_height/2, canvas_width/2);
    seconds_line.lineTo(seconds_x, seconds_y);
    ctx.lineWidth = 3;
    ctx.strokeStyle="#FF0000";
    ctx.stroke(seconds_line);
    
    var hour_x = circle_radius * Math.cos(hourAngle);
    var hour_y = circle_radius * (-Math.sin(hourAngle));
    
    hour_x += canvas_height/2;
    hour_y += canvas_height/2;
    
    var hour_line = new Path2D();
    hour_line.moveTo(canvas_height/2, canvas_width/2);
    hour_line.lineTo(hour_x, hour_y);
    ctx.lineWidth = 15;
    ctx.strokeStyle="#000000";
    ctx.stroke(hour_line);   
}

canvas_context = setCircle();
setCircle(canvas_context);
drawTimeArrows(canvas_context);