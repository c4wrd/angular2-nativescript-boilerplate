import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";

import { HomeComponent } from "./components/home.component";

@Component({
    selector: "my-app",
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [NS_ROUTER_PROVIDERS],
    template: "<page-router-outlet></page-router-outlet>"
})
@RouteConfig([
    { path: "/home", component: HomeComponent, name: "Home", useAsDefault: true },
])
export class AppComponent {

}
