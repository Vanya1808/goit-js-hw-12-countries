import css from "./css/style.css";
import debounce from "lodash.debounce"

import fetchCountries from "./js/fetchCountries.js"
import refs from "./js/countryRefs.js"
import countryItem from "./templates/countryItem.hbs"
import countryList from "./templates/countryList.hbs"

import {attention} from "./js/errors.js"
import { error } from "@pnotify/core"
import "@pnotify/core/dist/PNotify.css"
import "@pnotify/core/dist/BrightTheme.css"


refs.input.addEventListener("input", debounce((event)=>{
    refs.ul.innerHTML=""
    let query = event.target.value

    fetchCountries(query).then(data=>{
        console.log(data)
        if(data.length>=2 && data.length<=10){
            insertElement(countryList, data, refs.ul)
        } else if(data.length===1){
           insertElement(countryItem, data, refs.ul)
        } else {
            error(attention);
        }

    })
    refs.input.value=""
}, 1000)
)
function insertElement( template, data, place ) {
    const element = template(data)
    place.insertAdjacentHTML("beforeend", element)
}