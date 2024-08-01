import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HelpdeskComponent} from "./helpdesk/helpdesk.component";
import {IssueLogComponent} from "./issue-log/issue-log.component";

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    data:{
      breadcrumb:'Dashboard'
    },
    children:[
      {
        path:'helpdesk',
        component:HelpdeskComponent,
        data:{
          breadcrumb:'Help Desk'
        },
        children:[
          {
            path:'issue',
            component:IssueLogComponent,
            data:{
              breadcrumb: 'Issue Log'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
