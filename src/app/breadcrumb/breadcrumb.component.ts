import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {distinctUntilChanged, filter} from "rxjs";

export interface Breadcrumb{
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs:Breadcrumb[]=[];
  constructor(
    private router:Router,
    private activatedRoute : ActivatedRoute
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })
  }

  buildBreadCrumb(route:ActivatedRoute,url:string='',breadcrumbs:Breadcrumb[]=[]): Breadcrumb[]{
    // get label and path of breadcrumb
    let label = route.routeConfig && route.routeConfig.data ?
      route.routeConfig.data['breadcrumb'] : "";

    let path = route.routeConfig && route.routeConfig.data ?
      route.routeConfig.path : "";

    // generate next url
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb:Breadcrumb={
      label : label,
      url : nextUrl
    };

    // Add Route with Non-empty Label and Recursive Calls
    // there may be some routes which does not have breadcrumb set and these routes should be ignored by the builder.
    const newBreadCrumbs = breadcrumb.label ? [...breadcrumbs,breadcrumb] : [...breadcrumbs];
    if (route.firstChild){
      return this.buildBreadCrumb(route.firstChild,nextUrl,newBreadCrumbs);
    }
    return newBreadCrumbs;
  }

}
