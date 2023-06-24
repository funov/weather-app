import {getIcon} from "./index.js";
import {DocumentElements} from "./DocumentElements.js";
import {UnitUpdater} from "./UnitUpdater.js";

let documentElements = new DocumentElements();
let unitUpdater = new UnitUpdater();

export class SidebarDataUpdater {
    updateData(data, currentConditions, unit) {
        documentElements.currentLocation.innerText = data.resolvedAddress;
        documentElements.description.innerText = currentConditions.conditions[0]
            + currentConditions.conditions.slice(1).toLowerCase();
        if (unit === "c") {
            documentElements.temp.innerText = Math.round(currentConditions.temp);
        } else {
            documentElements.temp.innerText = unitUpdater.celsiusToFahrenheit(currentConditions.temp);
        }
        console.log(currentConditions.icon);
        documentElements.mainIcon.src = getIcon(currentConditions.icon);
    }
}