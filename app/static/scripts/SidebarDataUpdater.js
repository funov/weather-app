import {getIcon} from "./index.js";
import {DocumentElements} from "./DocumentElements.js";
import {UnitUpdater} from "./UnitUpdater.js";

let documentElements = new DocumentElements();
let unitUpdater = new UnitUpdater();

export class SidebarDataUpdater {
    updateData(data, unit) {
        documentElements.currentLocation.innerText = data.location;
        // documentElements.description.innerText = currentConditions.conditions[0]
        //     + currentConditions.conditions.slice(1).toLowerCase();
        documentElements.description.innerText = data.description;
        if (unit === "c") {
            documentElements.temp.innerText = Math.round(data.temperature);
        } else {
            documentElements.temp.innerText = unitUpdater.celsiusToFahrenheit(data.temperature);
        }
        documentElements.mainIcon.src = getIcon(data.icon);
    }
}