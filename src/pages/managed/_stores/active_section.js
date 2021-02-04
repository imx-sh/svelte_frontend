import { writable } from "svelte/store";
import sections from "./sections.json";

let local;

if (localStorage.getItem("active_section"))
	local = JSON.parse(localStorage.getItem("active_section"));

const active_section = writable(local || sections[1]);

export default active_section;
