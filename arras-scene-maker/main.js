var turret = false
var tmpTank = ""
var entity = [];
var head = true
var offset = 0
var ETC = ""
var ETP = ""
var trans = -22
var trans2 = 198
var sliderP = 700
var helpMult = 0
var help = false
var alertOn = false
var alertPos = -120
var deleteMode = false

function dismissAlert() {
	alertOn = false
}

function alert(text1,text2,text3) {
	document.getElementById("alertText1").innerHTML = text1
	document.getElementById("alertText2").innerHTML = text2
	document.getElementById("alertText3").innerHTML = text3
	alertOn = true
}

function toggle(bool) {
	if (bool) {
		return false
	} else {
		return true
	}
}

function convert() {
	try {
		var code = JSON.stringify(convertFTB(JSON.parse(document.getElementById("barrelsInput").value)))
		document.getElementById("barrelsInput").value = code
		document.getElementById("etInput").value = "tank"
		document.getElementById("classInput").value = "custom"
	}
	catch(err) {
		alert(
			"Invalid FTB code! Please check that there is nothing wrong with the code and that you removed the header.",
			"",
			""
		);
	}
}

function setColorInput(color){
	colorInput.value = color;
};

function applySceneSize(){
	canvas.width = sceneXW.value
	canvas.height = sceneYW.value

	//canvas2.width = window.innerWidth
};

function resetSceneSize(){
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
};

function clearscene(){
	entity = []
	console.log("cleared");
};

function exporttank(){
	sceneCodeText.value = exportJSON(entity);
	console.log("exported");
};

function importtank(){
	entity = importJSON(sceneCodeText.value);
	console.log("imported");
};

function exportJSON(json){
	return JSON.stringify(json);
};

function importJSON(json){
	return JSON.parse(json);
};


function degToRad(angle){
	return angle * Math.PI/180;
};


function levelToSize(level) {
return Math.pow(1.01055,level-1)*1.854*12;
};


function deleteEntity(x,y,r){
	for(i=0;i<entity.length;i++){
		var ent = entity[i];
		if (getDistance(x,y,ent.x,ent.y) <= r){
			entity.splice(i,1);
		};
	};
};


function getDistance(ax,ay,bx,by){
	return Math.sqrt(((bx-ax)*(bx-ax))+((by-ay)*(by-ay)));
};

function toggleHelp() {
	help = toggle(help)
}

function step(){
	if (isLoaded){
		document.getElementById("mousePos").innerHTML = "X: " + mouseX + " Y: " + mouseY

		if (alertOn) {
			alertPos = ((alertPos-5)/2)+5
		} else {
			alertPos = ((alertPos+120)/2)-120
		}
		document.getElementById("alert").style.top = alertPos

		if (help) {
			helpMult = ((helpMult-1)/1.35)+1
		} else {
			helpMult = helpMult/1.3
		}

		document.getElementById("help").style.opacity = helpMult
		document.getElementById("help").style.fontSize = 12*helpMult
		document.getElementById("help").style.width = 300*helpMult
		document.getElementById("help").style.height = 400*helpMult

		if (mouseY < 25) {
			trans = (((trans+2)/2)-2)
		} else {
			trans = (((trans+22)/2)-22)
		}

		if (mouseY < 225) {
			trans2 = (((trans2-198)/2)+198)
		} else {
			trans2 = (((trans2-178)/2)+178)
		}

		ETC = makeEntityType
		if (ETC != ETP) {
			setAvailableTanks();
		}
		ETP = makeEntityType

		makeEntityAngle = Math.atan2(mouseY - makeEntityY - offset, mouseX - makeEntityX)*(180/Math.PI);
		makeEntityBarrels = getClassBarrels(classInput.value);
		makeEntityColor = colorInput.value;
		makeEntityBodyType = getClassBodyType(classInput.value);
		makeEntityLevel = levelInput.value;
		makeEntityName = nameInput.value;
		makeEntityType = entType.value;
		makeEntityClass = classInput.value;
	};
	
	if(keysPressed[69]){
		deleteEntity(mouseX,mouseY+window.pageYOffset-offset,20);
	};
		
};


var mouseX, mouseY;
var evt = window.event;

var isMakingEntity = false;
var doMakeEntity = false;
var isLoaded = false;
var makeEntityX, makeEntityY, makeEntityAngle, makeEntityColor, makeEntityBarrels, makeEntityLevel, makeEntityBodyType, makeEntityName, makeEntityType;
var levelInput, angleInput, colorInput, nameInput, classInput, btypeInput, sceneCodeText, barrelArray, entType;

function handleOnLoad(){
	isLoaded = true;
	levelInput = document.getElementById("levelInput");
	angleInput = document.getElementById("angleInput");
	colorInput = document.getElementById("colorInput");
	nameInput = document.getElementById("nameInput");
	classInput = document.getElementById("classInput");
	btypeInput = document.getElementById("btypeInput");
	sceneCodeText = document.getElementById("scenecodeText");
	barrelArray = document.getElementById("barrelsInput");
	entType = document.getElementById("etInput");
	//document.getElementById('canvas').width = window.innerWidth;
};

function toggleDelMode() {
	deleteMode = toggle(deleteMode);
	var db1 = document.getElementById("delButton1")
	var db2 = document.getElementById("delButton2")
	if (deleteMode) {
		canvas.style.cursor = "url(cursorremove.png), auto";
		db1.style.visibility = "hidden";
		db2.style.visibility = "visible";
	} else {
		canvas.style.cursor = "url(cursorplace.png), auto";
		db2.style.visibility = "hidden";
		db1.style.visibility = "visible";
	}
}

function handleClick(evt){
	//Try Deleting First
	if (deleteMode) {
		var entsToRemove = []
		for (var i=0;i<entity.length;i++){
			var ent = entity[i];
			if (Math.sqrt(Math.pow(mouseX-ent.x,2)+Math.pow(mouseY-ent.y,2)) < levelToSize(entity[i].level) ) {
				entsToRemove.push(i)
			}
		}
		for (var i=0;i<entsToRemove.length;i++){
			entity.splice(entsToRemove[i],1)
		}
		return;
	}
	/*addEntity(
	mouseX,
	mouseY,
	angleInput.value,
	colorInput.value,
	1,
	nameInput.value,
	levelInput.value,
	getClassBarrels(classInput.value)
	);*/
	//Make Entity
	if (!turret) {
		if (!isMakingEntity){
			makeEntityX = mouseX;
			makeEntityY = mouseY;
		};
			
		if (isMakingEntity){
			doMakeEntity = true;
			if (classInput.value == "autotrapper" || classInput.value == "autogunner" || classInput.value == "autoTriAngle" || classInput.value == "autoDouble" || classInput.value == "autosmasher") {
				makeEntity(
					makeEntityType,
					makeEntityX,
					makeEntityY,
					colorInput.value,
					1,
					nameInput.value,
					levelInput.value,
					getClassBarrels(classInput.value),
					makeEntityBodyType,
					makeEntityClass
				);
				turret = true
				tmpTank = classInput.value
				classInput.value = "turret"
			};
		};
		
		
		makeEntity(
			makeEntityType,
			makeEntityX,
			makeEntityY,
			colorInput.value,
			1,
			nameInput.value,
			levelInput.value,
			getClassBarrels(classInput.value),
			makeEntityBodyType,
			makeEntityClass
		);
	} else {
		doMakeEntity = true
		
		makeEntity(
			makeEntityType,
			makeEntityX,
			makeEntityY,
			"#484848",
			1,
			"",
			levelInput.value,
			getClassBarrels("turret"),
			makeEntityBodyType,
			makeEntityClass
		);

		doMakeEntity = true
		
		makeEntity(
			makeEntityType,
			makeEntityX,
			makeEntityY,
			"#A7A7AF",
			1,
			"",
			levelInput.value-75,
			getClassBarrels("blank"),
			"circle",
			makeEntityClass
		);
		turret = false
		classInput.value = tmpTank
	};
};	
var keysPressed = [];
function handleKeyDown(evt){
	keysPressed[evt.keyCode] = true;
		
	
};	
function handleKeyUp(evt){
	keysPressed[evt.keyCode] = false;
};	


function handleMouseMove(evt){
	mouseX = evt.pageX-canvas.offsetLeft;
	mouseY = evt.pageY;
	if (mouseX < 0) {
		document.getElementById("mousePos").style.visibility = "hidden";
	} else {
		document.getElementById("mousePos").style.visibility = "visible";
	}
};
	
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
document.onmousemove = handleMouseMove;
	
setInterval(step,50);

function makeEntity(type,x,y,color,health,name,level,barrels,bodyType,classT){
	isMakingEntity = true;
	if (doMakeEntity){
		isMakingEntity = false;
		doMakeEntity = false;
		addEntity(type,x,y,Math.atan2(mouseY - makeEntityY - offset, mouseX - makeEntityX)*(180/Math.PI),color,health,name,level,barrels,bodyType,classT);
	};
};


function addEntity(type,x,y,angle,color,health,name,level,barrels,bodyType,classT){
	entity.push({entityType:type,x:x,y:y,angle:angle,color:color,health:health,name:name,level:level,barrels:barrels,bodyType:bodyType,classT:classT});
	console.log("tank added");
};

function getClassBarrels(className){
	if (className == "basic"){
		return [
	{barrelType: 0, length: 42, width: 18, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "flank"){
		return [
	{barrelType: 0, length: 42, width: 18, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 120, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 240, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "octo"){
		return [
	{barrelType: 0, length: 42, width: 18, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 45, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 135, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 315, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 18, angle: 225, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "ac"){
		return [
	{barrelType: 0, length: 34, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "dom"){
		return [
			{barrelType: 3, length: 34, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "ms"){
		return [
			{barrelType: 0, length: 29, width: 9, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*2, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*3, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*4, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*5, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*6, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*7, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*8, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*9, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*10, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*11, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*12, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*13, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*14, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*15, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if(className == "sniper"){
		return [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if(className == "assassin"){
		return [
	{barrelType: 0, length: 58, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "hunter"){
		return [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "predator"){
		return [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 44, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 27, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "trapper" || className == "autotrapper"){
		return [
	{barrelType: 2, length: 45, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
    ];
		} else if (className == "megatrapper"){
		return [
      {barrelType: 2, length: 45, width: 55, angle: 0, offsetX: 0, damage: 1, penetration: 1}
           ];
		} else if (className == "overseer"){
		return [
	{barrelType: 1, length: 34, width: 40, angle: 90, offsetX: 0, damage: 1, penetration: 1},
        {barrelType: 1, length: 34, width: 40, angle: 270, offsetX: 0, damage: 1, penetration: 1}
  ];
		} else if (className == "overlord"){
		return [
	{barrelType: 1, length: 34, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 180, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "director"){
		return [
	{barrelType: 1, length: 32, width: 38, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "manager"){
		return [
	{barrelType: 1, length: 34, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "twin"){
		return [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1}
]; 
		} else if (className == "tripletwin"){
		return [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 120, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 120, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 240, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 240, offsetX: 24, damage: 1, penetration: 1}
];
		} else if (className == "doubleTwin" || className == "autoDouble"){
		return [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: 24, damage: 1, penetration: 1}
];
		} else if (className == "triplet"){
		return [
	{barrelType: 0, length: 38, width: 19, angle: 0, offsetX: -27, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 0, offsetX: 27, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "triple"){
		return [
			{barrelType: 0, length: 44, width: 18, angle: 17.5, offsetX: 2, damage: 1, penetration: 1},
			{barrelType: 0, length: 44, width: 18, angle: -17.5, offsetX: -2, damage: 1, penetration: 1},
			{barrelType: 0, length: 50, width: 18, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "penta"){
		return [
	{barrelType: 0, length: 34, width: 19, angle: 40, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 320, offsetX: 0, damage: 1, penetration: 1},
	
	{barrelType: 0, length: 43, width: 19, angle: 20, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 43, width: 19, angle: 340, offsetX: 0, damage: 1, penetration: 1},
	
	{barrelType: 0, length: 48, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
];
		} else if (className == "triangle" || className == "autoTriAngle"){
		return [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "booster"){
		return [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 138, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 222, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1}
	];
		} else if (className == "fighter"){
		return [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "underseer"){
		return [
	{barrelType: 1, length: 34, width: 34, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 34, angle: 270, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "necromancer"){
		return [
	{barrelType: 1, length: 34, width: 34, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 34, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 34, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 34, angle: 180, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "summoner"){
		return [
	{barrelType: 1, length: 30, width: 31, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 30, width: 31, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 30, width: 31, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 30, width: 31, angle: 360, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "guardian"){
		return [{barrelType: 1, length: 25, width: 30, angle: 0, offsetX: 0, damage: 1, penetration: 1}];
		} else if (className == "maleficitor"){
		return [
	{barrelType: 1, length: 34, width: 34, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
		} else if (className == "custom"){
		return importJSON(barrelArray.value);
		} else if (className == "overtrapper"){
		return [
			{barrelType: 1, length: 34, width: 40, angle: 120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 34, width: 40, angle: -120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 2, length: 45, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "tritrapper"){
		return [
			{barrelType: 2, length: 45, width: 40, angle: 120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 2, length: 45, width: 40, angle: -120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 2, length: 45, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "gunnertrapper"){
		return [
			{barrelType: 2, length: 45, width: 60, angle: 180, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: 20, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: -20, damage: 1, penetration: 1}
		];
		} else if (className == "turret"){
		return [
			{barrelType: 0, length: 22, width: 15, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "gunner" || className == "autogunner") {
		return [
			{barrelType: 0, length: 33, width: 10, angle: 0, offsetX: 33, damage: 1, penetration: 1},
			{barrelType: 0, length: 33, width: 10, angle: 0, offsetX: -33, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: 17, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: -17, damage: 1, penetration: 1}
		];
		} else if (className == "minigun") {
		return [
			{barrelType: 0, length: 51, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 44, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 37, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "streamliner") {
		return [
			{barrelType: 0, length: 65, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 58, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 51, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 44, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 37, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "cropDuster"){
		return [
			{barrelType: 0, length: 51, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 44, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 37, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 34, width: 40, angle: 180, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "spread"){
		return [
			{barrelType: 0, length: 30, width: 10, angle: 75, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 30, width: 10, angle: -75, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 34, width: 10, angle: 60, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 34, width: 10, angle: -60, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 38, width: 10, angle: 45, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 38, width: 10, angle: -45, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 42, width: 10, angle: 30, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 10, angle: -30, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 46, width: 10, angle: 15, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 46, width: 10, angle: -15, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "hexa"){
		return [
			{barrelType: 0, length: 42, width: 18, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 18, angle: 120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 18, angle: 240, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 18, angle: 60, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 18, angle: 180, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 18, angle: 300, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "pounder"){
		return [
			{barrelType: 0, length: 48, width: 26, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "destroyer"){
		return [
			{barrelType: 0, length: 48, width: 35, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "hybrid"){
		return [
			{barrelType: 0, length: 48, width: 35, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 34, width: 40, angle: 180, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "annihilator"){
		return [
			{barrelType: 0, length: 48, width: 45, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "sprayer"){
		return [
			{barrelType: 0, length: 54, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 45, width: 38, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "machine"){
		return [
			{barrelType: 1, length: 45, width: 38, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "minion"){
		return [
			{barrelType: 0, length: 42, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "master"){
		return [
			{barrelType: 1, length: 34, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 120, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: -120, offsetX: 0, damage: 1, penetration: 1}
		];
	} else {
		return [];
	};
	
};


function getClassBodyType(className){
	if(
	className == "blank" ||
	className == "basic" || 
	className == "twin" || 
	className == "sniper" || 
	className == "machine" ||
	className == "flank" ||
	className == "director" || 
	className == "pounder" ||
	className == "trapper" ||
    
	className == "doubleTwin" || 
	className == "autoDouble" ||
	className == "tripletwin" || 
	className == "triplet" || 
    
	className == "fighter" ||
	className == "sprayer" ||
	className == "destroyer" ||
	className == "hybrid" ||
	className == "annihilator" ||
	className == "hexa" ||
	className == "spread" ||
	className == "triple" ||
	className == "gunner" ||
	className == "autogunner" ||
    
	className == "minigun" ||
	className == "streamliner" ||
	className == "cropDuster" ||
    
	className == "autotrapper" ||
	className == "gunnertrapper" ||
	className == "tritrapper" ||
	className == "overtrapper" ||
	className == "ac" || 
	className == "assassin" || 
	className == "hunter" || 
	className == "predator" || 
	className == "megatrapper" || 
	className == "overseer" || 
	className == "overlord" || 
	className == "manager" || 
    
	className == "triangle" || 
	className == "autoTriAngle" ||
	className == "booster" ||
    
	className == "penta" ||
	className == "octo" ||
	className == "master" ||
	className == "minion"
	){
		return "circle";
	};
	if(
	className == "underseer" || 
	className == "necromancer" || 
	className == "maleficitor" ||
	className == "summoner"
	){
		return "square";
	};
	if(
	className == "guardian"
	){
		return "triangle";
	};
	if(
	className == "dom"
	){
		return "dominator";
	};
	if(
	className == "ms"
	){
		return "mothership";
	};
	if(
	className == "autosmasher" || className == "smasher"
	){
		return "smasher";
	};
	if(
	className == "landmine"
	){
		return "landmine";
	};
	if(
	className == "spike"
	){
		return "spike";
	};
	if(className == "custom"){
		return btypeInput.value;
	};
};
