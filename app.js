
const startButton = document.getElementById("start");
const timerDisplay = document.getElementById("timerDisplay");
const displayingTime = document.querySelector(".displayingTime");
const endTime = document.getElementById("endTime");
const buttons = document.querySelectorAll("[data-time]"); //choose all that has data-time attr, not just the buttons
const alert = document.querySelector("audio");
let countdown; // make a global (sort of) variable, so you can clear interval
let interval;
function startUsing(){
	this.parentElement.classList.add("invisible")
	this.parentElement.classList.remove("intro");
}

function alertMe(){
	interval = setInterval(()=>{
		alert.play();
	}, 1000);	
}

function makeStopAlertBtn(){
	const stopBtn = document.createElement("button");
	stopBtn.classList.add("stop");
	stopBtn.textContent = "off";
	displayingTime.append(stopBtn);

	function stopAlert(){
		clearInterval(interval);
		this.parentNode.removeChild(this);
		
	}
	stopBtn.addEventListener("click", stopAlert);
}

function timer(seconds){
	clearInterval(countdown); // clears all intervals which are running before this one
	const now = Date.now();
	const then = now + seconds*1000;
	displayTimeLeft(seconds);
	displayendTime(then);
	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then - Date.now())/1000);
		displayTimeLeft(secondsLeft);
		if(secondsLeft<=0){
			clearInterval(countdown);
			makeStopAlertBtn();
			alertMe();
		}
	}, 1000)
}
//timer(12000);

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds/60);
	const remainderSeconds = seconds % 60;
	//display = `${minutes}: ${remainderSeconds < 10 ? '0' : ''}`;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayendTime(timestamp){
	const finish = new Date(timestamp);
	const hours = finish.getHours();
	const minutes = finish.getMinutes();
	//const seconds = finish.getSeconds();
	const display = `${hours}: ${minutes< 10 ? '0': ''}${minutes}`;
	endTime.textContent = "Finish at: " + display;
}

function runTimer() {
	const time = parseInt(this.dataset.time, 10);
	timer(time);
}

startButton.addEventListener("click", startUsing);
buttons.forEach(button =>button.addEventListener("click", runTimer));
document.customForm.addEventListener("submit", function(event){
	event.preventDefault();
	const minutes = this.minutes.value;
	this.reset();
	timer(minutes*60);
})