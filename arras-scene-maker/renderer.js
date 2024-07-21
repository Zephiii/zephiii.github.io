var can = document.getElementById("canvas");
var can3 = document.getElementById("canvas3");
var ctx = can.getContext('2d');
var ctx3 = can3.getContext('2d');
ctx.font="bold 20px Ubuntu";
var prevSpin = 0
var camX = 0, camY = 0;
var prevZoom = .75
var canvas3 = document.getElementById("canvas3")

function getDistance(ax,ay,bx,by){
	return Math.sqrt(((bx-ax)*(bx-ax))+((by-ay)*(by-ay)));
};

function drawTank(x,y,angle,radius,color,barrels,bodyType,name,healF,ctxt) {

	var ctxtmp = document.getElementById(ctxt);
	var ctxx = ctxtmp.getContext('2d');

	ctxx.save();

	var time = new Date().getTime()
	
	//transformation
	ctxx.translate(x,y);
	ctxx.rotate(degToRad(angle));
	ctxx.scale(radius/48,radius/48);
	//settings
	ctxx.lineJoin = "round";
	ctxx.strokeStyle = "#484848";
	ctxx.fillStyle = "#A7A7AF";
	ctxx.lineWidth = 4/(radius/48);

	if (ctxt == "canvas3") {
		ctxx.lineWidth = (4/(radius/48))*prevZoom;
	}
	
	//bases
	if (bodyType == "smasher") { //smasher base

	
		ctxx.beginPath();
		ctxx.fillStyle = "#484848";
		ctxx.strokeStyle = "#484848";
		ctxx.lineJoin = "round";
		var hA = ((Math.PI * 2)/6);
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58);
		for (var hI = 1; hI < 8; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58);
		};
		ctxx.fill();
		ctxx.stroke();
		ctxx.closePath();
	};
	
		if (bodyType == "landmine") { //landmine base
		ctxx.beginPath();
		ctxx.fillStyle = "#484848";
		ctxx.strokeStyle = "#484848";
		ctxx.lineJoin = "round";
		var hA = ((Math.PI * 2)/6);
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58);
		for (var hI = 1; hI < 8; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/6)%360) )*58);
		};
		ctxx.fill();
		ctxx.stroke();
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/12)%360) )*58,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/12)%360) )*58);
		for (var hI = 1; hI < 8; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/12)%360) )*58,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/12)%360) )*58);
		};
		ctxx.fill();
		ctxx.stroke();
		ctxx.closePath();
	};
  
	if (bodyType == "spike") { //spike base
		ctxx.beginPath();
		ctxx.fillStyle = "#484848";
		ctxx.strokeStyle = "#484848";
		ctxx.lineJoin = "round";
		var hA = ((Math.PI * 2)/3);
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/3)%360))*60,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/3)%360))*64);
		for (var hI = 1; hI < 5; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle) + degToRad((time/3)%360) )*64);
		};
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle-90) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle-90) + degToRad((time/3)%360) )*64);
		for (var hI = 1; hI < 5; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle-90) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle-90) + degToRad((time/3)%360) )*64);
		};
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle-180) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle-180) + degToRad((time/3)%360) )*64);
		for (var hI = 1; hI < 5; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle-180) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle-180) + degToRad((time/3)%360) )*64);
		};
		ctxx.moveTo(Math.cos((hA*hI) - degToRad(angle-270) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle-270) + degToRad((time/3)%360) )*64);
		for (var hI = 1; hI < 5; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle-270) + degToRad((time/3)%360) )*60,Math.sin((hA*hI) - degToRad(angle-270) + degToRad((time/3)%360) )*64);
		};
		
		
		
		ctxx.fill();
		ctxx.stroke();
	
		ctxx.closePath();

		
		
	};

		if (bodyType == "dominator") { //dominator base
		ctxx.beginPath();
		ctxx.fillStyle = "#484848";
		ctxx.strokeStyle = "#484848";
		ctxx.lineJoin = "round";
		var hA = ((Math.PI * 2)/6);
		ctxx.moveTo(Math.cos(0-degToRad(angle))*58,Math.sin(0-degToRad(angle))*58);
		for (var hI = 1; hI < 8; hI++) {
			ctxx.lineTo(Math.cos((hA*hI) - degToRad(angle))*58,Math.sin((hA*hI) - degToRad(angle))*58);
		};
		ctxx.fill();
		ctxx.stroke();
	
		ctxx.closePath();	
		
	};
	//barrels
	ctxx.fillStyle = "#A7A7AF";
	
	
	for (i = 0; i < barrels.length; i++) { //basic rectangle
		if (barrels[i].barrelType == 0) {
			ctxx.save();
			ctxx.rotate(degToRad(barrels[i].angle));
			ctxx.fillRect(0,(48-barrels[i].width)-48+barrels[i].offsetX,barrels[i].length*2,barrels[i].width*2);
			ctxx.strokeRect(0,(48-barrels[i].width)-48+barrels[i].offsetX,barrels[i].length*2,barrels[i].width*2);
			ctxx.restore();
		};
		
		if (barrels[i].barrelType == 1) { //drone spawner / machine gun
			ctxx.save();
			ctxx.rotate(degToRad(barrels[i].angle));
			ctxx.beginPath();
			ctxx.moveTo(0,((-1*barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*2,((-1*barrels[i].width*2)/2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*2,((barrels[i].width*2)/2)+barrels[i].offsetX);
			ctxx.lineTo(0,((barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.lineTo(0,((-1*barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.fill();
			ctxx.stroke();
			ctxx.closePath();
			ctxx.restore();
		};
		if (barrels[i].barrelType == 2) { //trap launcher
			ctxx.save();
			ctxx.rotate(degToRad(barrels[i].angle));
			ctxx.fillRect(0,(48-barrels[i].width/2)-48+barrels[i].offsetX,barrels[i].length*2,barrels[i].width);
			ctxx.strokeRect(0,(48-barrels[i].width/2)-48+barrels[i].offsetX,barrels[i].length*2,barrels[i].width);
			ctxx.beginPath();
			ctxx.moveTo(barrels[i].length*1.6,((-1*barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*2,((-1*barrels[i].width*2)/2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*2,((barrels[i].width*2)/2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*1.6,((barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*1.6,((-1*barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.fill();
			ctxx.stroke();
			ctxx.closePath();
			ctxx.restore();
		};
		if (barrels[i].barrelType == 3) { //power barrel
			ctxx.save();
			ctxx.rotate(degToRad(barrels[i].angle));
			ctxx.beginPath();
			ctxx.moveTo(0,((-1*barrels[i].width)/2)+barrels[i].offsetX);
			ctxx.lineTo(0,((-1*barrels[i].width*2)/1)+barrels[i].offsetX);
			ctxx.lineTo(0,((-1*barrels[i].width*2)/1)+barrels[i].offsetX);
			ctxx.lineTo(0,(barrels[i].width*2)+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*1.8,((barrels[i].width))+barrels[i].offsetX);
			ctxx.lineTo(barrels[i].length*1.8,((-1*barrels[i].width))+barrels[i].offsetX);
			ctxx.lineTo(0,((-1*barrels[i].width*2))+barrels[i].offsetX);
			ctxx.fillRect(barrels[i].length*1.8,(48-barrels[i].width)-48+barrels[i].offsetX,barrels[i].length*0.5,barrels[i].width*2);
			ctxx.strokeRect(barrels[i].length*1.8,(48-barrels[i].width)-48+barrels[i].offsetX,barrels[i].length*0.5,barrels[i].width*2);
			ctxx.fill();
			ctxx.stroke();
			ctxx.closePath();
			ctxx.restore();
		};
	};

	//main body
	ctxx.rotate(0);
	//ctxx.scale(radius/48,radius/48);
	ctxx.fillStyle = color;
	ctxx.lineJoin = "round";
	if (bodyType == "circle" || bodyType == "smasher" || bodyType == "landmine" || bodyType == "spike" || bodyType == "dominator") { //circle for all circular types
		ctxx.beginPath();
		ctxx.arc(48-48,48-48,48,0,2*Math.PI);
		
		ctxx.fill();
		ctxx.stroke();
		
		ctxx.closePath();
		ctxx.fillStyle = "#000000";
	};
	if (bodyType == "square") { //square
		
		ctxx.fillRect(-48,-48,96,96);
		ctxx.strokeRect(-48,-48,96,96);
	};
	if (bodyType == "triangle") { //triangle
		
		ctxx.beginPath();
		var hA = ((Math.PI * 2)/3);
		ctxx.moveTo(Math.cos(hA/2)*64,Math.sin(hA/2)*64);
		for (var hI = 1; hI < 5; hI++) {
			ctxx.lineTo(Math.cos((hA*hI)+(hA/2))*64,Math.sin((hA*hI)+(hA/2))*64);
		};
		ctxx.fill();
		ctxx.stroke();
	
		ctxx.closePath();
	};
	if (bodyType == "pentagon") { //square for bodyType 1
		
		ctxx.beginPath();
		var hA = ((Math.PI * 2)/5);
		ctxx.moveTo(Math.cos(hA/2)*58,Math.sin(hA/2)*58);
		for (var hI = 1; hI < 7; hI++) {
			ctxx.lineTo(Math.cos((hA*hI)+(hA/2))*58,Math.sin((hA*hI)+(hA/2))*58);
		};
		ctxx.fill();
		ctxx.stroke();
	
		ctxx.closePath();
	};
	if (bodyType == "hexagon") {
		
		ctxx.beginPath();
		var hA = ((Math.PI * 2)/6);
		ctxx.moveTo(Math.cos(hA/2)*58,Math.sin(hA/2)*58);
		for (var hI = 1; hI < 8; hI++) {
			ctxx.lineTo(Math.cos((hA*hI)+(hA/2))*58,Math.sin((hA*hI)+(hA/2))*58);
		};
		ctxx.fill();
		ctxx.stroke();
	
		ctxx.closePath();
	};
	if (bodyType == "mothership") { //mothership

	
		ctxx.beginPath();
		var hA = ((Math.PI * 2)/16);
		ctxx.moveTo(Math.cos(hA/2)*48,Math.sin(hA/2)*48);
		for (var hI = 1; hI < 18; hI++) {
			ctxx.lineTo(Math.cos((hA*hI)+(hA/2))*48,Math.sin((hA*hI)+(hA/2))*48);
		};
		ctxx.fill();
		ctxx.stroke();
	
		ctxx.closePath();

	};

	ctxx.restore();
	ctxx.save();
	ctxx.translate(x,y);
	ctxx.scale(radius/32,radius/32);
	drawText(name,0,0-32-12,"canvas");
	ctxx.restore();
};




function drawText(text,x,y,ctxt) {
	var ctxtmp = document.getElementById(ctxt);
	var ctxx = ctxtmp.getContext('2d');
	ctxx.lineJoin = "round";

	ctxx.save();
	ctxx.lineWidth = 5;
	ctxx.textAlign = "center";
	ctxx.translate(x,y);
	ctxx.strokeStyle = "#484848";
	ctxx.strokeText(text,0,0,2000000);
	ctxx.fillStyle = "#ffffff";
	ctxx.fillText(text,0,0,2000000);
	ctxx.restore();

	
};



function drawCircle(x,y,radius,color) {
	ctx.save();
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = "#484848";
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
};


function drawSquare(x,y,angle,radius,color) {
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angle*Math.PI/180);
	ctx.lineWidth = 4;
	ctx.lineJoin = "round";
	ctx.fillStyle = color;
	ctx.strokeStyle = "#484848";
	ctx.fillRect(-1*radius,-1*radius,radius*2,radius*2);
	ctx.strokeRect(-1*radius,-1*radius,radius*2,radius*2);
	ctx.restore();
};

function drawPenta(pentaX,pentaY,pentaAng,pentaSize,pentaColor) {

	ctx.save();
	ctx.fillStyle = pentaColor;
	ctx.strokeStyle = "#484848";
	ctx.lineJoin = "round";
	ctx.lineWidth = 4/(pentaSize);
	ctx.beginPath();
	var pentaA = ((Math.PI * 2)/5);
	ctx.translate(pentaX,pentaY);
	ctx.rotate(degToRad(pentaAng));
	ctx.scale(pentaSize,pentaSize);
	ctx.moveTo(1,0);
	for (var pentaI = 1; pentaI < 7; pentaI++) {
		ctx.lineTo(Math.cos(pentaA*pentaI),Math.sin(pentaA*pentaI));
	}
	ctx.fill()
	ctx.stroke();
	
	ctx.closePath();
	ctx.restore();
};

function drawHexa(pentaX,pentaY,pentaAng,pentaSize,pentaColor) {

	ctx.save();
	ctx.fillStyle = pentaColor;
	ctx.strokeStyle = "#484848";
	ctx.lineJoin = "round";
	ctx.lineWidth = 4/(pentaSize);
	ctx.beginPath();
	var pentaA = ((Math.PI * 2)/6);
	ctx.translate(pentaX,pentaY);
	ctx.rotate(degToRad(pentaAng));
	ctx.scale(pentaSize,pentaSize);
	ctx.moveTo(1,0);
	for (var pentaI = 1; pentaI < 8; pentaI++) {
		ctx.lineTo(Math.cos(pentaA*pentaI),Math.sin(pentaA*pentaI));
	}
	ctx.fill()
	ctx.stroke();
	
	ctx.closePath();
	ctx.restore();
};

function drawTriangle(pentaX,pentaY,pentaAng,pentaSize,pentaColor) {

	ctx.save();
	ctx.fillStyle = pentaColor;
	ctx.strokeStyle = "#484848";
	ctx.lineJoin = "round";
	ctx.lineWidth = 4/(pentaSize);
	ctx.beginPath();
	var pentaA = ((Math.PI * 2)/3);
	ctx.translate(pentaX,pentaY);
	ctx.rotate(degToRad(pentaAng));
	ctx.scale(pentaSize,pentaSize);
	ctx.moveTo(1,0);
	for (var pentaI = 1; pentaI < 5; pentaI++) {
		ctx.lineTo(Math.cos(pentaA*pentaI),Math.sin(pentaA*pentaI));
	}
	ctx.fill()
	ctx.stroke();
	
	ctx.closePath();
	ctx.restore();
};

function drawTrap(pentaX,pentaY,pentaAng,pentaSize,pentaColor) {

	ctx.save();
	ctx.fillStyle = pentaColor;
	ctx.strokeStyle = "#484848";
	ctx.lineJoin = "round";
	ctx.lineWidth = 4/(pentaSize);
	ctx.beginPath();
	var pentaA = ((Math.PI * 2)/3);
	ctx.translate(pentaX,pentaY);
	ctx.rotate(degToRad(pentaAng));
	ctx.scale(pentaSize,pentaSize);
	ctx.moveTo(Math.cos(pentaA),Math.sin(pentaA));
	for (var pentaI = 1; pentaI < 5; pentaI++) {
		ctx.lineTo(Math.cos(pentaA*pentaI),Math.sin(pentaA*pentaI));
		ctx.lineTo(Math.cos(pentaA*(pentaI+.5))/3,Math.sin(pentaA*(pentaI+.5))/3);
	}
	ctx.fill()
	ctx.stroke();
	
	ctx.closePath();
	ctx.restore();
};

function drawBullet(pentaX,pentaY,pentaAng,pentaSize,pentaColor) {

	ctx.save();
	ctx.fillStyle = pentaColor;
	ctx.strokeStyle = "#484848";
	ctx.lineJoin = "round";
	ctx.lineWidth = 4/(pentaSize);
	ctx.beginPath();
	var pentaA = ((Math.PI * 2)/360);
	ctx.translate(pentaX,pentaY);
	ctx.rotate(degToRad(pentaAng));
	ctx.scale(pentaSize,pentaSize);
	ctx.moveTo(1,0);
	for (var pentaI = 1; pentaI < 362; pentaI++) {
		ctx.lineTo(Math.cos(pentaA*pentaI),Math.sin(pentaA*pentaI));
	}
	ctx.fill()
	ctx.stroke();
	
	ctx.closePath();
	ctx.restore();
};




function drawGrid(x,y,width,height,slotSize,lineColor,ctxt) {
	var ctxtmp = document.getElementById(ctxt);
	var ctxx = ctxtmp.getContext('2d');

	ctxx.save();
	ctxx.translate(x,y);
	ctxx.beginPath();
	ctxx.strokeColor = lineColor;
	ctxx.lineWidth = 1;

	if (ctxt == "canvas3") {
		ctxx.lineWidth = 1*prevZoom;
	}
	
	for(var i = 0; i < width || i < height; i += slotSize) {
		ctxx.moveTo(0,i);
		ctxx.lineTo(width,i);
		ctxx.moveTo(i,0);
		ctxx.lineTo(i,height);
	};
	ctxx.strokeStyle = lineColor;
	ctxx.stroke();
	ctxx.closePath();
	ctxx.restore();
};



function renderStep(){

	ctx.globalAlpha = 1;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#DBDBDB";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	drawGrid(0,0,canvas.width,canvas.height,24,"#D4D4D4","canvas");
	
	
	for(var i=0;i<entity.length;i++){
		var ent = entity[i];
		if (Math.sqrt(Math.pow(mouseX-ent.x,2)+Math.pow(mouseY-ent.y,2)) < levelToSize(ent.level) && deleteMode ) {
			ctx.globalAlpha = 0.6;
		} else {
			ctx.globalAlpha = 1;
		}
		if (ent.entityType == "tank"){
			drawTank(ent.x,ent.y,ent.angle,levelToSize(ent.level),ent.color,ent.barrels,ent.bodyType,ent.name,ent.health/100,"canvas");
		};
		if (ent.entityType == "shape"){ 
			if (ent.classT == "square"){
				drawSquare(ent.x,ent.y,ent.angle,16,ent.color);
			};
			if (ent.classT == "pentagon"){
				drawPenta(ent.x,ent.y,ent.angle,32,ent.color);
			};
			if (ent.classT == "bpentagon"){
				drawPenta(ent.x,ent.y,ent.angle,64,ent.color);
			};
			if (ent.classT == "apentagon"){
				drawPenta(ent.x,ent.y,ent.angle,96,ent.color);
			};
			if (ent.classT == "triangleS"){
				drawTriangle(ent.x,ent.y,ent.angle,24,ent.color);
			};
			if (ent.classT == "hexagon"){
				drawHexa(ent.x,ent.y,ent.angle,36,ent.color);
			};
			if (ent.classT == "drone"){
				drawTriangle(ent.x,ent.y,ent.angle,levelToSize(ent.level)/1.5,ent.color);
			};
			if (ent.classT == "trap"){
				drawTrap(ent.x,ent.y,ent.angle,ent.level,ent.color);
			};
			if (ent.classT == "bullet"){
				drawBullet(ent.x,ent.y,ent.angle,ent.level,ent.color);
			};
		};
	};
	if (isMakingEntity){
		ctx.globalAlpha = 0.6;
		if (makeEntityType == "tank"){
			drawTank(makeEntityX,makeEntityY,makeEntityAngle,levelToSize(makeEntityLevel),makeEntityColor,makeEntityBarrels,makeEntityBodyType,makeEntityName,1,"canvas");
		};
		if (makeEntityType == "shape"){
			if (makeEntityClass == "square"){
				drawSquare(makeEntityX,makeEntityY,makeEntityAngle,16,makeEntityColor);
			};
			if (makeEntityClass == "pentagon"){
				drawPenta(makeEntityX,makeEntityY,makeEntityAngle,32,makeEntityColor);
			};
			if (makeEntityClass == "bpentagon"){
				drawPenta(makeEntityX,makeEntityY,makeEntityAngle,64,makeEntityColor);
			};
			if (makeEntityClass == "apentagon"){
				drawPenta(makeEntityX,makeEntityY,makeEntityAngle,96,makeEntityColor);
			};
			if (makeEntityClass == "triangleS"){
				drawTriangle(makeEntityX,makeEntityY,makeEntityAngle,24,makeEntityColor);
			};
			if (makeEntityClass == "drone"){
				drawTriangle(makeEntityX,makeEntityY,makeEntityAngle,levelToSize(makeEntityLevel)/1.5,makeEntityColor);
			};
			if (makeEntityClass == "trap"){
				drawTrap(makeEntityX,makeEntityY,makeEntityAngle,makeEntityLevel,makeEntityColor);
			};
			if (makeEntityClass == "bullet"){
				drawBullet(makeEntityX,makeEntityY,makeEntityAngle,makeEntityLevel,makeEntityColor);
			};
		};
		ctx.globalAlpha = 1;
	};
};

setInterval(renderStep,50);
