import {
    currentState
} from "./index.js";


export class BackgroundUpdater {
    UpdateBackground(time) {
        time = parseInt(time, 10);
        let resTimesOfDay = this.GetResponseTimesOfDay(time);

        if (resTimesOfDay !== currentState.timesOfDay){
            this.ChangeAnimation(resTimesOfDay)
        }
    }

    ChangeAnimation(timesOfDay){
        if (currentState.timesOfDay !== ''){
            console.log('no');
            this.DeleteAnimation();
        }
        console.log('yes');
        let container = document.createElement("div");
        container.className = "container";

        if (timesOfDay === 'night'){
            container.innerHTML = `<div class="spinner">
                                    <div class="moon"></div>
                                   </div>`;
            let stars = document.createElement("div");
            stars.className = "stars";
            document.body.appendChild(container);
            document.body.appendChild(stars)
            document.body.style.background = "linear-gradient(#14045f, #331a99, #282bce, #1555ec, #1e84f7)";
            stars.style.animation = "stars-night 6s forwards";
            // document.body.style.animation = "colors-night 6s forwards";
            currentState.timesOfDay = "night";
        } else if (timesOfDay === 'morning') {
            let stars = document.createElement("div");
            stars.className = "stars";
            document.body.appendChild(stars);
            document.body.style.background = "linear-gradient(#11137a, #324da6, #5c5eb7, #c079a7, #e5d19e)";
            stars.style.animation = "stars-morning-evening 6s forwards";
            // document.body.style.animation = "colors-morning 6s forwards";
            currentState.timesOfDay = "morning";
        } else if (timesOfDay === 'day') {
            container.innerHTML = `<div class="spinner">
                                     <div class="sun">
                                        <div class="ray1"></div>
                                        <div class="ray2"></div>
                                        <div class="ray3"></div>
                                        <div class="ray4"></div>
                                     </div>
                                 </div>`;
            document.body.appendChild(container);
            document.body.style.background = "linear-gradient(#082f77, #2353bb, #357cd0, #28aec5, #f5f0af)";
            // document.body.style.animation = "colors-day 6s forwards";
            currentState.timesOfDay = "day";
        } else {
            let stars = document.createElement("div");
            stars.className = "stars";
            document.body.appendChild(stars);
            document.body.style.background = "linear-gradient(#3f006c, #750050, #b10042, #da4837, #f7bb38)";
            stars.style.animation = "stars-morning-evening 6s forwards";
            // document.body.style.animation = "colors-evening 6s forwards";
            currentState.timesOfDay = "evening";
        }
    }

    DeleteAnimation(){
        if (currentState.timesOfDay === "night"){
            let container = document.querySelector(".container");
            container.style.animation = "delete 3s forwards";
            let stars = document.querySelector(".stars");
            stars.style.animation = "delete 12s forwards";
            document.body.removeChild(container);
            document.body.removeChild(stars);
        }
        else if (currentState.timesOfDay === "morning"){
            let stars = document.querySelector(".stars");
            stars.style.animation = "delete 12s forwards";
            document.body.removeChild(stars);
        }
        else if (currentState.timesOfDay === "day"){
            let container = document.querySelector(".container");
            container.style.animation = "delete 12s forwards";
            document.body.removeChild(container);
        }
        else {
            let stars = document.querySelector(".stars");
            stars.style.animation = "delete 12s forwards";
            document.body.removeChild(stars);
        }
    }

    GetResponseTimesOfDay(time){
        if (0 <= time && time < 6){
            console.log('not true 1')
            return 'night';
        }
        else if (6 <=  time && time < 12){
            console.log('not true 2')
            return 'morning';
        }
        else if (12 <=  time && time < 18){
            console.log('true')
            return 'day';
        }
        return 'evening';
    }
}