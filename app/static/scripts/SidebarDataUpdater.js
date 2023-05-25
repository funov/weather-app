import {getIcon} from "./index.js";
import {DocumentElements} from "./DocumentElements.js";
import {UnitUpdater} from "./UnitUpdater.js";

let documentElements = new DocumentElements();
let unitUpdater = new UnitUpdater();

export class SidebarDataUpdater{
    updateData(data, weather, unit) {
        documentElements.currentLocation.innerText = data.resolvedAddress;
        documentElements.description.innerText = weather.conditions;
        if (unit === "c") {
            documentElements.temp.innerText = Math.round(weather.temp);
        } else {
            documentElements.temp.innerText = unitUpdater.celsiusToFahrenheit(weather.temp);
        }
        documentElements.mainIcon.src = getIcon(weather.icon);
    }
}